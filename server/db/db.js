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
   * @description Read disasters from the db, filtering using provided parameters
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
    } else {
      const cursor = await instance.disastersColl.distinct('type');
      const disasters = Array.from(cursor).filter(value => value);
      return disasters;
    }
  }

  //ADD ASYNC readGdp FUNCTION HERE
  /**
   * @description Add provided gdp array to the db
   * @param {array<Object>} gdp array of gdp values objects
   * @returns 
   */
  async createManyGDP(gdp) {
    return await instance.gdpColl.insertMany(gdp);
  }

  /**
   * @description Creates many disasters
   * @param {array} disasters 
   * @returns {num} number of rows that were inserted
   */
  async createManyDisasters(disasters) {
    return await instance.disastersColl.insertMany(disasters);
  }
  /**
   * @description Connects to the db
   * @returns if there's already an instance of db
   */
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
  /**
   * Opens db connection
   */
  async open() {
    try {
      await instance.connect(dbName);
    } finally {
      await instance.close();
    }
  }
  /**
   * Closes db connection
   */
  async close() {
    await instance.client.close();
    instance = null;
  }
};
