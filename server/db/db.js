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
      this.collection = null;
    }
    return instance;
  }

  async readAll() {
    return await instance.collection.find().projection({ _id: 0 }).toArray();
  }

  async create(quote) {
    return await instance.collection.insertOne(quote);
  }

  async createMany(quotes) {
    return await instance.collection.insertMany(quotes);
  }
    
  async connect(dbname, collName) {
    if (instance.db){
      return;
    }
    await instance.client.connect();
    instance.db = await instance.client.db(dbname);
    // Send a ping to confirm a successful connection
    await instance.client.db(dbname).command({ ping: 1 });
    console.log('Successfully connected to MongoDB database ' + dbname);
    instance.collection = await instance.db.collection(collName);
  }

  async open(dbname, collName) {
    try {
      await instance.connect(dbname, collName);
    } finally {
      await instance.close();
    }
  }

  async close() {
    await instance.client.close();
    instance = null;
  }
};
