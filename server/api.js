const express = require('express');
const DB = require('./db/db.cjs');

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

app.get('/api/v1/:year/natural-disasters/:country?type', async (req, res) => {
  if (db) {
    res.type('json');
    //Ill change soon
    var disastersData = await db.readDisasters();
    res.send(disastersData);
  } else {
    res.status(500).send('Database connection not established');
  }
});

app.get('api/v1/year/natural-disasters/:type', (req, res)=>{
  
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