require('dotenv').config({ path: require('find-config')('.env') });
const dbUrl = process.env.ATLAS_URI;
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

  async readAll() {
    return await instance.collection.find().projection({ _id: 0 }).toArray();
  }

  //Get disasters from db by year and country or by year and type
  async readDisasters(inputYear = '', inputCountry = '', inputType = '') {
    if (inputYear !== '' && inputCountry !== '') {
      return await instance.collection.find({ 
        year: { $eq: inputYear },
        country: { $eq: inputCountry } 
      }).toArray();
    } else if (inputYear !== '' && inputType !== '') {
      return await instance.collection.find({ 
        year: { $eq: inputYear },
        type: { $eq: inputType } 
      }).toArray();
    }
  }

  async createManyGDP(gdp) {
    return await instance.gdpColl.insertMany(gdp);
  }

  async createManyDisasters(disasters) {
    return await instance.disastersColl.insertMany(disasters);
  }
    
  async connect(dbname) {
    if (instance.db){
      return;
    }
    await instance.client.connect();
    instance.db = await instance.client.db(dbname);
    // Send a ping to confirm a successful connection
    await instance.client.db(dbname).command({ ping: 1 });
    console.log('Successfully connected to MongoDB database ' + dbname);
    // get 2 collections for gdp and disasters
    instance.gdpColl = await instance.db.collection('gdp');
    instance.disastersColl = await instance.db.collection('disasters');
  }

  async open(dbname) {
    try {
      await instance.connect(dbname);
    } finally {
      await instance.close();
    }
  }

  async close() {
    await instance.client.close();
    instance = null;
  }
};
