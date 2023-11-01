const request = require('supertest');
const app = require('../api');
const DB = require('../db/db');
const seed = require('../utils/seed');

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

fs.createReadStream('../../data/1970-2021_DISASTERS.csv').
  pipe(parse({ delimiter: ',', from_line: 2 })).
  on('data', function (row) {
    const obj = {};
    obj['id'] = row[0];
    obj['year'] = row[1];
    obj['subgroup'] = row[5];
    obj['type'] = row[6];
    obj['country'] = row[10];
    obj['countryCode'] = row[11];
    obj['latitude'] = row[24];
    obj['longitude'] = row[25];
    obj['insuredDamages'] = row[40];
    obj['damages'] = row[41];
    disasters.push(obj);
tmp:"", 

//testing seed
describe('GET ../../data/1970-2021_DISASTERS.csv', () => {
  test('It should respond with a json array', async () => {
    jest.spyOn(seed.prototype, 'createReadStream').mockResolvedValue(
      [{_id: '6542c9a56c21ed88f111ece1', id: '2001-0021-AGO', year: '2001', tmp:"", tmp:"", 
        subgroup: 'Hydrological', type: 'Flood', tmp:"", tmp:"", tmp:"", country: 'Angola', countryCode: 'AGO', tmp:"", 
        tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", 
        latitude: '', longitude: '', tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", 
        tmp:"", tmp:"", insuredDamages: '', damages: '', tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", }]);
    const response = await request(app).get('../../data/1970-2021_DISASTERS.csv');

    expect(response.body).toEqual([{_id: '6542c9a56c21ed88f111ece1', id: '2001-0021-AGO', year: '2001', tmp:"", tmp:"", 
    subgroup: 'Hydrological', type: 'Flood', tmp:"", tmp:"", tmp:"", country: 'Angola', countryCode: 'AGO', tmp:"", 
    tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", 
    latitude: '', longitude: '', tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", 
    tmp:"", tmp:"", insuredDamages: '', damages: '', tmp:"", tmp:"", tmp:"", tmp:"", tmp:"", }]);
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});