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
 *     summary: Retrieve a list of mongoDB countries
 *     description: Retrieve a list of countries from MongoDB. Can be used to populate the map.
 *     responses:
 *       200:
 *         description: A list of countries.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items: 
 *                     type: string
 *                   example: ["Canada","Japan","Mexico"]
*/
router.get('/api/v1/countries', getCountries);

module.exports = router;