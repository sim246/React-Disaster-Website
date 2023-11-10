const request = require('supertest');
const app = require('../api');
const DB = require('../db/db');

jest.mock('../db/db');
jest.mock('../utils/seed');

// test disasters per year per country
describe('GET /api/v1/1973/natural-disasters/country/Colombia', () => {
  test('It should respond with a json array', async () => {
    const expectedVal = [
      {
        id: '1973-0043-COL',
        year: '1973',
        subgroup: 'Hydrological',
        type: 'Flood',
        country: 'Colombia',
        countryCode: 'COL',
        latitude: '',
        longitude: '',
        insuredDamages: '',
        damages: ''
      }
    ];
    jest.spyOn(DB.prototype, 'readDisasters').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/1973/natural-disasters/country/Colombia');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(expectedVal);
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});


describe('GET /api/v1/2050/natural-disasters/country/Colombia', () => {
  test('It should have failed', async () => {
    const expectedVal = {status: '404', message: 'Not found:'};
    jest.spyOn(DB.prototype, 'readDisasters').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/2050/natural-disasters/country/Colombia');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(expectedVal);
    expect(response.statusCode).toBe(404);
    expect(response.type).toEqual('application/json');
  });
});


describe('GET /api/v1/1972/natural-disasters/type/Storm', () => {
  test('It should respond with a json array', async () => {
    const expectedVal = [
      {
        id: '1972-0051-IND',
        year: '1972',
        subgroup: 'Meteorological',
        type: 'Storm',
        country: 'India',
        countryCode: 'IND',
        latitude: '',
        longitude: '',
        insuredDamages: '',
        damages: ''
      },
      {
        id: '1972-0063-IND',
        year: '1972',
        subgroup: 'Meteorological',
        type: 'Storm',
        country: 'India',
        countryCode: 'IND',
        latitude: '',
        longitude: '',
        insuredDamages: '',
        damages: ''
      }
    ];
    jest.spyOn(DB.prototype, 'readDisasters').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/1972/natural-disasters/type/Storm');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(expectedVal);
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});

describe('GET /api/v1/1972/natural-disasters/type/Whatever', () => {
  test('It should have failed', async () => {
    const expectedVal = { status: 404, message: 'invalid query parameters' };
    jest.spyOn(DB.prototype, 'readDisasters').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/1972/natural-disasters/type/Whatever');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(expectedVal);
    expect(response.statusCode).toBe(404);
    expect(response.type).toEqual('application/json');
  });
});

describe('GET /api/v1/natural-disasters', () => {
  test('It should respond with a json array', async () => {
    const expectedVal = ["Animal accident","Drought","Earthquake","Epidemic",
      "Extreme temperature ","Flood","Glacial lake outburst","Impact",
      "Insect infestation","Landslide","Mass movement (dry)","Storm",
      "Volcanic activity","Wildfire"]
    jest.spyOn(DB.prototype, 'readDisasters').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/natural-disasters');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(expectedVal);
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});

describe('GET /api/v1/natural-disastersoinon', () => {
  test('It should have failed', async () => {
    const expectedVal = {status: '404', message: 'Sorry cant find that!'};
    jest.spyOn(DB.prototype, 'readDisasters').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/natural-disastersoinon');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(expectedVal);
    expect(response.statusCode).toBe(404);
    expect(response.type).toEqual('application/json');
  });
});