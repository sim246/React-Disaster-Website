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

/**
 * @swagger
 * /api/v1/{year}/natural-disasters/country/{country}:
 *   get:
 *     summary: Retrieve a list of all the natusal disaters for a given country and year.
 *     description: Retrieve a list of all the possible natural disater for a given country and year from MongoDB. The information is displayed in the application.
 *     parameters:
 *     - name: year
 *       in: path
 *       description: 'the given year'
 *       required: true
 *       type: int
 *       default: 2012
 *     - name: country
 *       in: path
 *       description: 'the given country'
 *       required: true
 *       type: string
 *       default: Japan
 *     responses:
 *       200:
 *         description: A list of all the natusal disaters for a given country and year.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                    type: string
 *                    example: "6542c9a56c21ed88f1120260"
 *                   id:
 *                    type: string
 *                    example: "2012-0034-DZA"
 *                   year:
 *                    type: string
 *                    example: "2012"
 *                   subgroup:
 *                    type: string
 *                    example: "Hydrological"
 *                   type:
 *                    type: string
 *                    example: "Flood"
 *                   country:
 *                    type: string
 *                    example: "Canada"
 *                   countryCode:
 *                    type: string
 *                    example: "CAN"
 *                   latitude:
 *                    type: string
 *                    example: "46.5994"
 *                   longitude:
 *                    type: string
 *                    example: "-67.5"
 *                   insuredDamages:
 *                    type: string
 *                    example: "200"
 *                   damages:
 *                    type: string
 *                    example: "1200"
 */
router.get('/api/v1/:year/natural-disasters/country/:country', getNaturalDisastersByCountries);

/**
 * @swagger
 * /api/v1/{year}/natural-disasters/type/{type}:
 *   get:
 *     summary: Retrieve a list of all the natusal disaters for a given type and year.
 *     description: Retrieve a list of all the possible natural disater for a given type and year from MongoDB. The information is displayed in the application.
 *     parameters:
 *     - name: year
 *       in: path
 *       description: 'the given year'
 *       required: true
 *       type: int
 *       default: 2012
 *     - name: type
 *       in: path
 *       description: 'the given type'
 *       required: true
 *       type: string
 *       default: Flood
 *     responses:
 *       200:
 *         description: A list of all the natusal disaters for a given type and year.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                    type: string
 *                    example: "6542c9a56c21ed88f1120260"
 *                   id:
 *                    type: string
 *                    example: "2012-0034-DZA"
 *                   year:
 *                    type: string
 *                    example: "2012"
 *                   subgroup:
 *                    type: string
 *                    example: "Hydrological"
 *                   type:
 *                    type: string
 *                    example: "Flood"
 *                   country:
 *                    type: string
 *                    example: "Canada"
 *                   countryCode:
 *                    type: string
 *                    example: "CAN"
 *                   latitude:
 *                    type: string
 *                    example: "46.5994"
 *                   longitude:
 *                    type: string
 *                    example: "-67.5"
 *                   insuredDamages:
 *                    type: string
 *                    example: "200"
 *                   damages:
 *                    type: string
 *                    example: "1200"
 */
router.get('/api/v1/:year/natural-disasters/type/:type', getNaturalDisastersByType);

/**
 * @swagger
 * /api/v1/natural-disasters:
 *   get:
 *     summary: Retrieve a list of all the possible disater types.
 *     description: Retrieve a list of all the possible disater types from MongoDB. The information is displayed in the application.
 *     responses:
 *       200:
 *         description: A list of all the possible disater types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "Flood"
 */
router.get('/api/v1/natural-disasters', getNaturalDisasters);

/**
 * @swagger
 * /api/v1/{year}/gdp:
 *   get:
 *     summary: Retrieve a list of GDPs for all the countries for the given year from mongoDB.
 *     description: Retrieve a list of GDPs for all for the countries for the given year from MongoDB. The information is displayed in the application.
 *     parameters:
 *     - name: year
 *       in: path
 *       description: 'the given year'
 *       required: true
 *       type: int
 *       default: 2012
 *     responses:
 *       200:
 *         description: A list of GDPs for all the countries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6542c9a36c21ed88f111a231"
 *                   conutry:
 *                     type: string
 *                     example: "Canada"
 *                   contryCode:
 *                     type: string
 *                     example: "CAN"
 *                   year:
 *                     type: string
 *                     example: "1970"
 *                   gdp:
 *                     type: string
 *                     example: "87896095320.0"
 *                   gdpPerCapita:
 *                     type: string
 *                     example: "87896095320.0"
 */
router.get('/api/v1/:year/gdp', getGDPs);

/**
 * @swagger
 * /api/v1/countries/coordinates:
 *   get:
 *     summary: Retrieve a list of mongoDB coordinates for all countries.
 *     description: Retrieve a list of coordinates for all countries from MongoDB. Can be used to populate a map.
 *     responses:
 *       200:
 *         description: A list of coordinates for all countries.
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
 *     summary: Retrieve a list of mongoDB coordinates for a given country.
 *     description: Retrieve a list of coordinates for a given country from MongoDB. Can be used to populate a map.
 *     parameters:
 *     - name: country
 *       in: path
 *       description: 'the name of a country'
 *       required: true
 *       type: string
 *       default: Japan
 *     responses:
 *       200:
 *         description: A list of coordinates for a given country.
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
 *     summary: Retrieve a list of mongoDB countries.
 *     description: Retrieve a list of countries from MongoDB. Can be used to populate a map.
 *     responses:
 *       200:
 *         description: A list of countries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 type: string
 *                 example: "Canada"
*/
router.get('/api/v1/countries', getCountries);

module.exports = router;