const DB = require('../db/db.js');
const fs = require('fs');
const { parse } = require('csv-parse');

const gdp = [];
const disasters = [];
// get GDP data from file
fs.createReadStream('../../data/world_country_gdp_usd.csv').
  pipe(parse({ delimiter: ',', from_line: 2 })).
  on('data', function (row) {
    const obj = {};
    obj['conutry'] = row[0];
    obj['countryCode'] = row[1];
    obj['year'] = row[2];
    obj['gdp'] = row[3];
    obj['gdpPerCapita'] = row[3];
    gdp.push(obj);
  }).
  on('end', function () {
    console.log('finished');
    //console.log(gdp);
  }).
  on('error', function (error) {
    console.log(error.message);
  });
// get natural disasters data from file
fs.createReadStream('../../data/1970-2021_DISASTERS.csv').
  pipe(parse({ delimiter: ',', from_line: 2 })).
  on('data', function (row) {
    const obj = {};
    obj['id'] = row[0];
    obj['year'] = row[1];
    obj['subgroup'] = row[5];
    obj['type'] = row[6];
    obj['country'] = row[10];
    obj['countryCode'] = row[11];
    obj['latitude'] = row[24];
    obj['longitude'] = row[25];
    obj['insuredDamages'] = row[40];
    obj['damages'] = row[41];
    disasters.push(obj);
  }).
  on('end', function () {
    console.log('finished');
    //console.log(disasters);
  }).
  on('error', function (error) {
    console.log(error.message);
  });

(async () => {
  let db;
  try {
    const db = new DB();
    await db.connect('520db', 'gdp');
    const num = await db.createMany(gdp);
    console.log(`Inserted ${num} gdp rows`);
    const num2 = await db.createMany(disasters);
    console.log(`Inserted ${num2} disaster rows`);
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