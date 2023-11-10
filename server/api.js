const express = require('express');
const DB = require('./db/db.js');

const app = express();
const db = new DB();

app.use(express.static('../client/build'));

/**
 * @description Gets from db the natural disasters by parameter year by parameter country
 * @param {string} country
 * @param {num} year
 */
app.get('/api/v1/:year/natural-disasters/country/:country', async (req, res) => {
  res.type('json');
  if (db) {
    if (isNaN(parseInt(req.params.year)) || req.params.year < 1960 || req.params.year > 2021) {
      res.status(404).send({status: '404', message: 'Not found:'});
    }
  
    //Getting disasters by year and country from db
    let disastersData;
    try {
      disastersData = await db.readDisasters(req.params.year, req.params.country);
    } catch (error) {
      res.status(404).send({status: '404', message: 'Not found: ' + error});
    }
    
    const typeParam = req.query.type;
    let filteredData = disastersData;
    if (typeParam) {
      filteredData = filteredData.filter((disaster)=> disaster.type === typeParam);
    }
    if (!res.headersSent){
      res.send(filteredData);
    }
  } else {
    res.status(500).send({status: '500', message: 'Database connection not established'});
  }
});

/**
 * @description Gets from db the natural disasters by parameter year by parameter type
 * @param {string} country
 * @param {string} type
 */
app.get('/api/v1/:year/natural-disasters/type/:type', async (req, res)=>{

  const year = req.params.year;
  const type = req.params.type;
  const types = ['Flood', 'Storm', 'Earthquake', 'Epidemic', 'Landslide', 'Wildfire', 
    'Volcanic activity', 'Mass movement (dry)', 'Insect infestation', 'Animal accident', 
    'Drought', 'Extreme temperature'];
  if (year < 1960 || year > 2021 || types.includes(type)) {
    if (db) {
      res.type('json');
      //Ill change soon
      var disastersData = await db.readDisasters(year, '', type);
      if (disastersData) {
        if (!res.headersSent){
          res.send(disastersData);
        }
      } else {
        res.status(404).send({ status: 404, message: 'not found' });
      }
    } else {
      res.status(500).send({status: 500, message: 'Database connection not established'});
    }
  } else {
    res.status(404).send({ status: 404, message: 'invalid query parameters' });
  }
});

/**
 * @description Gets from db the gdp by parameter year 
 * @param {num} year
 */
app.get('/api/v1/:year/gdp', async (req, res)=>{ 
  res.type('json');
  if (db) {
    if (isNaN(parseInt(req.params.year)) || req.params.year < 1960 || req.params.year > 2021) {
      res.status(404).send({status: '404', message: 'Not found:'});
    }
  
    //Getting gdp by year 
    let gdpData;
    try {
      gdpData = await db.readGdp(req.params.year);
    } catch (error) {
      res.status(404).send({status: '404', message: 'Not found: ' + error});
    }
    
    //Optionally getting gdp by country too
    const countryParam = req.query.country;
    let filteredData = gdpData;
    if (countryParam) {
      filteredData = filteredData.filter((economy)=> economy.country === countryParam);
    }
    if (!res.headersSent){
      res.send(filteredData);
    }
  } else {
    res.status(500).send({status: '500', message: 'Database connection not established'});
  }
});

/**
 * @description Gets from db information about geographical borders of a given country
 * @param {string} country
 */
app.get('/api/v1/countries/:country', async (req, res) => {
  res.type('json');
  if (db) {
    let countryData;
    try {
      countryData = await db.readCountry(req.params.country);
      console.log(countryData)
    } catch (error) {
      res.status(404).send({status: '404', message: 'Not found: ' + error});
    }
    if (!res.headersSent){
      res.send(countryData);
    }
  } else {
    res.status(500).send({status: '500', message: 'Database connection not established'});
  }
});

/**
 * @default Default page if not any of the other routes is looked up
 */
app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
  next();
});

module.exports = app;