const express = require('express');
const DB = require('./db/db.js');

const app = express();
const port = 3000;
let server;
let db;
(async () => {
  try {
    db = new DB();
    //CHANGE NAME OF DATA AFTER
    await db.connect('Cluster0', 'quotes'); 
  } catch (e) {
    console.error('could not connect');
    console.dir(e);
    process.exit();
  }
})();
let disastersData;
let economyData;

app.get('/api/v1/:year/natural-disasters/:country', async (req, res) => {
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
    res.send(filteredData);
  } else {
    res.status(500).send({status: '500', message: 'Database connection not established'});
  }
});

app.get('api/v1/:year/natural-disasters/:type', async (req, res)=>{
  let year = req.params.year;
  let type = req.params.type;
  const types = ["Flood", "Storm", "Earthquake", "Epidemic", "Landslide", "Wildfire", "Volcanic activity", 
                  "Mass movement (dry)", "Insect infestation", "Animal accident", "Drought", "Extreme temperature"];
  if (year < 1960 || year > 2021 || types.includes(type)) {
    if (db) {
      res.type('json');
      //Ill change soon
      var disastersData = await db.readDisasters(year, type);
      if (disastersData) {
        res.send(disastersData);
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

app.use(express.static('../client/build'));

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
  next();
});

// Read file and start listening only after that
try {
  //stationsData = await getStations();
  if (Object.keys(disastersData).length && Object.keys(economyData)) {
    server = app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
} catch (error) {
  console.error(`Failed to start server: ${error.message}`);
}

//Graceful shutdown
process.on('SIGINT', () => {
  debug('SIGINT signal received: closing HTTP server');
  server.close(() => {
    debug('HTTP server closed');
  });
});