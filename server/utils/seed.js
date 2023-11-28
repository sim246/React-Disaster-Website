require('dotenv').config({ path: require('find-config')('.env') });
const dbName = process.env.DB_NAME;
const DB = require('../db/db.js');
const fs = require('fs');
const { parse } = require('csv-parse');

const gdp = [];
const disasters = [];
/** 
 *  get data from the world_country_gdp_usd.csv file
 *  create objects for each row
 *  add it to gdp array 
 */
fs.createReadStream('../../data/world_country_gdp_usd.csv').
  pipe(parse({ delimiter: ',', fromLine: 2 })).
  on('data', function (row) {
    const obj = {};
    obj['country'] = row[0];
    obj['countryCode'] = row[1];
    obj['year'] = row[2];
    obj['gdp'] = row[3];
    obj['gdpPerCapita'] = row[4];
    gdp.push(obj);
  }).
  on('end', function () {
    console.log('finished constructing gdp obj');
  }).
  on('error', function (error) {
    console.log(error.message);
  });
  
/** 
 *  get data from the 1970-2021_DISASTERS.csv file
 *  create objects for each row
 *  add it to disasters array 
 */
fs.createReadStream('../../data/1970-2021_DISASTERS.csv').
  pipe(parse({ delimiter: ',', fromLine: 2 })).
  on('data', function (row) {
    const coordinates = convertCoordinates(row[24], row[25]);
    const obj = {};
    obj['id'] = row[0];
    obj['year'] = row[1];
    obj['subgroup'] = row[5];
    obj['type'] = row[6];
    obj['country'] = row[10];
    obj['countryCode'] = row[11];
    obj['latitude'] = coordinates[0];
    obj['longitude'] = coordinates[1];
    obj['insuredDamages'] = row[40];
    obj['damages'] = row[41];
    disasters.push(obj);
  }).
  on('end', function () {
    console.log('finished constructing disasters obj');
  }).
  on('error', function (error) {
    console.log(error.message);
  });

  function convertCoordinates(latitude, longitude) {

    // Parse latitude and longitude values
    const latMatch = latitude.match(/([\d.]+)\s*([NS])$/);
    const lonMatch = longitude.match(/([\d.]+)\s*([EW])$/);

    if (!latMatch || !lonMatch) {
      if (latitude.match(/([\d.]+)([\d.]+)$/)) {
        return [latitude, longitude];
      }
      return [null, null];
    }

    const latValue = parseFloat(latMatch[1]);
    const lonValue = parseFloat(lonMatch[1]);

    // Determine the sign based on N/S and E/W
    const latSign = latMatch[2] === 'N' ? 1 : -1;
    const lonSign = lonMatch[2] === 'E' ? 1 : -1;

    // Apply the sign to the values
    const convertedLat = latSign * latValue;
    const convertedLon = lonSign * lonValue;

    const coordinates = [];
    coordinates.push(convertedLat);
    coordinates.push(convertedLon);
    return coordinates;
  }

let countriesObj;
/**
 *  get data from countries.geojson file
 *  parse into JSON obj
 *  swap coordinates for leaflet-compatible format
 */
(async () => {
  try {
    const data = await fs.promises.readFile('../../data/countries.geojson', 'utf-8');
    countriesObj = await JSON.parse(data);
    console.log('finished parsing countries json');
    countriesObj.features.forEach(feature => {
      swapCoordinates(feature.geometry);
    });
    console.log('finished swapping coordinates');
  } catch (err) {
    console.error(err.message);
    process.exit(9);
  }
})();

/**
 * @description swaps lng and lat coordinates position
 * @param {Object} geometry geojson geometry object
 */
function swapCoordinates(geometry) {
  if (geometry.type === 'Polygon') {
    geometry.coordinates = geometry.coordinates.map(ring =>
      ring.map(coord => [coord[1], coord[0]])
    );
  } else if (geometry.type === 'MultiPolygon') {
    geometry.coordinates = geometry.coordinates.map(polygon =>
      polygon.map(ring =>
        ring.map(coord => [coord[1], coord[0]])
      )
    );
  } else {
    console.error('Unsupported geometry type:', geometry.type);
  }
}

/**
 *  insert gdp, disasters and countries arrays to the db
 */
(async () => {
  let db;
  try {
    db = new DB();
    await db.connect(dbName);
    const gdpRowsInserted = await db.createManyGDP(gdp);
    console.log(`Inserted ${gdpRowsInserted.insertedCount} gdp rows`);
    const disasterRowsInserted = await db.createManyDisasters(disasters);
    console.log(`Inserted ${disasterRowsInserted.insertedCount} disaster rows`);
    const countriesRowsInserted = await db.createManyCountries(countriesObj['features']);
    console.log(`Inserted ${countriesRowsInserted.insertedCount} countries rows`);
  } catch (e) {
    console.error('could not seed');
    console.dir(e);
  } finally {
    if (db) {
      db.close();
    }
    process.exit();
  }
})();