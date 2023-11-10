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
    const expectedVal = { status: 404, message: 'invalid request parameters' };
    jest.spyOn(DB.prototype, 'readDisasters').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/1972/natural-disasters/type/Whatever');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(expectedVal);
    expect(response.statusCode).toBe(404);
    expect(response.type).toEqual('application/json');
  });
});

// test gdp per year
describe('GET /api/v1/2012/gdp', () => {
  test('It should respond with a json array', async () => {
    const expectedVal = [
      {
        _id: '6542c9a36c21ed88f111cdb2',
        country: 'Aruba',
        countryCode: 'ABW',
        year: '2012',
        gdp: '2615083799.0',
        gdpPerCapita: '2615083799.0',
      }
    ];
    jest.spyOn(DB.prototype, 'readGDPs').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/2012/gdp');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(expectedVal);
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});

// test gdp per year and conutry
describe('GET /api/v1/2012/gdp?country=Canada', () => {
  test('It should respond with a json array', async () => {
    const expectedVal = [
      {
        _id: '6542c9a36c21ed88f111cdd5',
        country: 'Canada',
        countryCode: 'CAN',
        year: '2012',
        gdp: '1828370000000.0',
        gdpPerCapita: '1828370000000.0',
      }
    ];
    jest.spyOn(DB.prototype, 'readGDPs').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/2012/gdp?country=Canada');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(expectedVal);
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});

describe('GET /api/v1/5012/gdp', () => {
  test('It should have failed', async () => {
    const expectedVal = { status: 404, message: 'invalid request parameters' };
    jest.spyOn(DB.prototype, 'readDisasters').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/5012/gdp');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(expectedVal);
    expect(response.statusCode).toBe(404);
    expect(response.type).toEqual('application/json');
  });
});

describe('GET /api/v1/5012/gdp?country=Whatever', () => {
  test('It should have failed', async () => {
    const expectedVal = { status: 404, message: 'invalid request parameters' };
    jest.spyOn(DB.prototype, 'readDisasters').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/5012/gdp');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(expectedVal);
    expect(response.statusCode).toBe(404);
    expect(response.type).toEqual('application/json');
  });
});