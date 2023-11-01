require('dotenv').config({ path: require('find-config')('.env') });
const dbUrl = process.env.ATLAS_URI;
const dbName = process.env.DB_NAME;
const { MongoClient } = require('mongodb');

let instance = null;

module.exports = class DB {
  constructor(){
    //instance is the singleton, defined in outer scope
    if (!instance){
      instance = this;
      this.client = new MongoClient(dbUrl);
      this.db = null;
      this.disastersColl = null;
      this.gdpColl = null;
    }
    return instance;
  }

  /**
   * Read disasters from the db, filtering using provided parameters
   * @param {string} inputYear filter disasters by year
   * @param {string} inputCountry if provided, filter disasters by country
   * @param {string} inputType if provided, filter by disaster type
   * @returns 
   */
  async readDisasters(inputYear = '', inputCountry = '', inputType = '') {
    if (inputYear !== '' && inputCountry !== '') {
      return await instance.disastersColl.find({ 
        year: { $eq: inputYear },
        country: { $eq: inputCountry } 
      }).toArray();
    } else if (inputYear !== '' && inputType !== '') {
      return await instance.disastersColl.find({ 
        year: { $eq: inputYear },
        type: { $eq: inputType } 
      }).toArray();
    }
  }

  //ADD ASYNC readGdp FUNCTION HERE

  async createManyGDP(gdp) {
    return await instance.gdpColl.insertMany(gdp);
  }

  async createManyDisasters(disasters) {
    return await instance.disastersColl.insertMany(disasters);
  }
    
  async connect() {
    if (instance.db){
      return;
    }
    await instance.client.connect();
    instance.db = await instance.client.db(dbName);
    // Send a ping to confirm a successful connection
    await instance.client.db(dbName).command({ ping: 1 });
    console.log('Successfully connected to MongoDB database ' + dbName);
    // get 2 collections for gdp and disasters
    instance.gdpColl = await instance.db.collection('gdp');
    instance.disastersColl = await instance.db.collection('disasters');
  }

  async open() {
    try {
      await instance.connect(dbName);
    } finally {
      await instance.close();
    }
  }

  async close() {
    await instance.client.close();
    instance = null;
  }
};
