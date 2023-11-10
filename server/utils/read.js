require('dotenv').config({ path: require('find-config')('.env') });
const dbName = process.env.DB_NAME;
const DB = require('../db/db.js');


(async () => {
    let db;
    try {
      db = new DB();
      await db.connect(dbName);
      const countries = await db.readCountries();
      console.log(countries[10])
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