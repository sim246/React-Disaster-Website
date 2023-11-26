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

/**
 * @swagger
 * /api/v1/countries/coordinates:
 *   get:
 *     summary: Retrieve a list of mongoDB coordinates for all countries
 *     description: Retrieve a list of coordinates for all countries from MongoDB. Can be used to populate a map.
 *     responses:
 *       200:
 *         description: A list of coordinates for all countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   properties:
 *                     type: object
 *                     properties:
 *                       ADMIN:
 *                         type: string
 *                         example: "Canada"
 *                   geometry:
 *                     type: object
 *                     properties:
 *                       coordinates:
 *                         type: array
 *                         items:
 *                           type: array
 *                           items:
 *                             type: float
 *                             example: [1.22334353, -2.3482758947]
 */

router.get('/api/v1/countries/coordinates', getCountriesCoordinates);

/**
 * @swagger
 * /api/v1/countries/{country}:
 *   get:
 *     summary: Retrieve a list of mongoDB coordinates for a given country
 *     description: Retrieve a list of coordinates for a given country from MongoDB. Can be used to populate a map.
 *     parameters:
 *     - name: country
 *       in: path
 *       description: 'country'
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: A list of coordinates for a given country
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The country ID.
 *                   example: "6553d288db6e8109af46433e"
 *                 type:
 *                   type: string
 *                   description: The type.
 *                   example: "Feature"
 *                 properties:
 *                   type: object
 *                   properties:
 *                     ADMIN:
 *                       type: string
 *                       example: "Canada"
 *                     ISO_A3:
 *                       type: string
 *                       example: "CAN"
 *                 geometry:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "MultyPolygon"
 *                     coordinates:
 *                       type: array
 *                       items:
 *                         type: array
 *                         items:
 *                           type: array
 *                           items:
 *                             type: float
 *                             example: [1.22334353, -2.3482758947]
*/
router.get('/api/v1/countries/:country', getCountry);

/**
 * @swagger
 * /api/v1/countries:
 *   get:
 *     summary: Retrieve a list of mongoDB countries
 *     description: Retrieve a list of countries from MongoDB. Can be used to populate a map.
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