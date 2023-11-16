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

router.get('/api/v1/countries', getCountries);

module.exports = router;