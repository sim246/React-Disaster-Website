const DB = require('../db/db.js');
const db = new DB();

async function getNaturalDisastersByCountries(req, res) {
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
    res.status(404).send({ status: 404, message: 'invalid request parameters' });
  }
}

/**
 * @description Gets from db the natural disaster types
 */
async function getNaturalDisasters(req, res) {
  res.type('json');
  if (db) {
    var disastersData = await db.readDisasters();
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
        gdpData = await db.readGDPs(req.params.year);
        if (!res.headersSent){
          res.send(gdpData);
        }
      } catch (error) {
        res.status(404).send({status: '404', message: 'Not found: ' + error});
      }
    } else if (countryParam) {
      try {
        const gdpData = await db.readGDPs(req.params.year, countryParam);
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
    let countryData;
    try {
      countryData = await db.readCountriesWithCoords();
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
    let countryData;
    try {
      countryData = await db.readCountry(req.params.country);
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
    let countryData;
    try {
      countryData = await db.readCountries();
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