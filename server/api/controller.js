const DB = require('../db/db.js');
const db = new DB();
const cache = require('memory-cache');

async function getNaturalDisastersByCountries(req, res) {
  res.type('json');
  if (db) {
    if (isNaN(parseInt(req.params.year)) || req.params.year < 1960 || req.params.year > 2021) {
      res.status(404).send({status: '404', message: 'Not found:'});
    }
  
    //Getting disasters by year and country from db
    let disastersData = cache.get(`disastersData/${req.params.year}/${req.params.country}`);
    try {
      if (!disastersData){
        disastersData = await db.readDisasters(req.params.year, req.params.country);
        cache.put(`disastersData/${req.params.year}/${req.params.country}`, disastersData);
      }
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
}

/**
 * @description Gets from db the natural disasters by parameter year by parameter type
 * @param {string} country
 * @param {string} type
 */
async function getNaturalDisastersByType(req, res) {
  const year = req.params.year;
  const type = req.params.type;
  const types = ['Flood', 'Storm', 'Earthquake', 'Epidemic', 'Landslide', 'Wildfire', 
    'Volcanic activity', 'Mass movement (dry)', 'Insect infestation', 'Animal accident', 
    'Drought', 'Extreme temperature'];
  if (year < 1960 || year > 2021 || types.includes(type)) {
    if (db) {
      res.type('json');
      //Ill change soon
      let disastersData = cache.get(`disastersDataByType/${year}/${type}`);
      if (!disastersData){
        disastersData = await db.readDisasters(year, '', type);
        cache.put(`disastersDataByType/${year}/${type}`, disastersData);
      }
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
    res.status(404).send({ status: 404, message: 'invalid request parameters' });
  }
}

/**
 * @description Gets from db the natural disaster types
 */
async function getNaturalDisasters(req, res) {
  res.type('json');
  if (db) {
    let disastersData = cache.get('disastersData');
    if (!disastersData){
      disastersData = await db.readDisasters();
      cache.put('disastersData', disastersData);
    }
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
}

/**
 * @description Gets from db the gdp by parameter year 
 * @param {num} year
 */
async function getGDPs(req, res) {
  res.type('json');
  if (db) {
    if (isNaN(parseInt(req.params.year)) || req.params.year < 1960 || req.params.year > 2021) {
      res.status(404).send({status: 404, message: 'invalid request parameters'});
    }
    const countryParam = req.query.country;
    if (!countryParam) {
      let gdpData;
      try {
        gdpData = cache.get(`gdp/${req.params.year}`);
        if (!gdpData){
          gdpData = await db.readGDPs(req.params.year);
          cache.put(`gdp/${req.params.year}`, gdpData);
        }
        if (!res.headersSent){
          res.send(gdpData);
        }
      } catch (error) {
        res.status(404).send({status: '404', message: 'Not found: ' + error});
      }
    } else if (countryParam) {
      try {
        let gdpData = cache.get(`gdp/${req.params.year}/${countryParam}`);
        if (!gdpData){
          gdpData = await db.readGDPs(req.params.year, countryParam);
          cache.put(`gdp/${req.params.year}/${countryParam}`, gdpData);
        }
        if (!res.headersSent){
          res.send(gdpData);
        }
      } catch (error) {
        res.status(404).send({status: '404', message: 'Not found: ' + error});
      }
    }
  } else {
    res.status(500).send({status: '500', message: 'Database connection not established'});
  }
}

/**
 * THIS IS VERY SLOW
 * @description Gets from db information about geographical borders of a all countries
 */
async function getCountriesCoordinates(req, res) {
  res.type('json');
  if (db) {
    let countryData = cache.get('coords');
    try {
      if (!countryData){
        countryData = await db.readCountriesWithCoords();
        cache.put('coords', countryData);
      }
      if (!countryData || countryData.length === 0) {
        throw new Error(404);
      }
    } catch (error) {
      res.status(404).send({status: '404', message: 'Not found: ' + error});
    }
    if (!res.headersSent){
      res.send(countryData);
    }
  } else {
    res.status(500).send({status: '500', message: 'Database connection not established'});
  }
}

/**
 * @description Gets from db information about geographical borders of a given country
 * @param {string} country
 */
async function getCountry(req, res) {
  res.type('json');
  if (db) {
    let countryData = cache.get(`coords/${req.params.country}`);
    try {
      if (!countryData){
        countryData = await db.readCountry(req.params.country);
        cache.put(`coords/${req.params.country}`, countryData);
      }
    } catch (error) {
      res.status(404).send({status: '404', message: 'Not found: ' + error});
    }
    if (!res.headersSent){
      res.send(countryData);
    }
  } else {
    res.status(500).send({status: '500', message: 'Database connection not established'});
  }
}

async function getCountries(req, res) {
  res.type('json');
  if (db) {
    let countryData = cache.get('countries');
    try {
      if (!countryData){
        countryData = await db.readCountries();
        cache.put('countries', countryData);
      }
    } catch (error) {
      res.status(404).send({status: '404', message: 'Not found: ' + error});
    }
    if (!res.headersSent){
      res.send(countryData);
    }
  } else {
    res.status(500).send({status: '500', message: 'Database connection not established'});
  }
}

module.exports = {getNaturalDisastersByCountries, getNaturalDisastersByType, 
  getNaturalDisasters, getGDPs, getCountriesCoordinates, getCountry, getCountries};