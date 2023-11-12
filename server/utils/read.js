/**
 * read from db script used for TESTING
 */

require('dotenv').config({ path: require('find-config')('.env') });
const dbName = process.env.DB_NAME;
const DB = require('../db/db.js');


(async () => {
  let db;
  try {
    db = new DB();
    await db.connect(dbName);
    const countries = await db.readCountries();
    //console.log(countries);
    countries.forEach(feature => {
      swapCoordinates(feature.geometry);
    });
    console.log(countries[11].geometry.coordinates[0]);
  } catch (e) {
    console.error('could not read');
    console.dir(e);
  } finally {
    if (db) {
      db.close();
    }
    process.exit();
  }
})();

function swapCoordinates(geometry) {
  if (geometry.type === 'Polygon') {
    // For Polygons
    geometry.coordinates = geometry.coordinates.map(ring =>
      ring.map(coord => [coord[1], coord[0]])
    );
  } else if (geometry.type === 'MultiPolygon') {
    // For MultiPolygons
    geometry.coordinates = geometry.coordinates.map(polygon =>
      polygon.map(ring =>
        ring.map(coord => [coord[1], coord[0]])
      )
    );
  } else {
    console.error('Unsupported geometry type:', geometry.type);
  }
}
