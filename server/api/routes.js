const router = require('express').Router();
const {
  getNaturalDisastersByCountries, 
  getNaturalDisastersByType, 
  getNaturalDisasters, 
  getGDPs, 
  getCountriesCoordinates, 
  getCountry, 
  getCountries
} = require('./controller.js');


router.get('/api/v1/:year/natural-disasters/country/:country', getNaturalDisastersByCountries);

router.get('/api/v1/:year/natural-disasters/type/:type', getNaturalDisastersByType);

router.get('/api/v1/natural-disasters', getNaturalDisasters);

router.get('/api/v1/:year/gdp', getGDPs);

router.get('/api/v1/countries/coordinates', getCountriesCoordinates);

router.get('/api/v1/countries/:country', getCountry);

/**
 * @swagger
 * /api/v1/countries:
 *   get:
 *     summary: Retrieve a list of countries
 *     description: Retrieve a list of countries from MongoDB. Can be used to populate the map.
*/
router.get('/api/v1/countries', getCountries);

module.exports = router;