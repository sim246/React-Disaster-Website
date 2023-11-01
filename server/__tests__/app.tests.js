const request = require('supertest');
const app = require('../api');
const DB = require('../db/db');

jest.mock('../db/db');

describe('GET /api/v1/1973/natural-disasters/country/Colombia', () => {
  test('It should respond with a json array', async () => {
    const mockedVal = [
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
    jest.spyOn(DB.prototype, 'readDisasters').mockResolvedValue(mockedVal);
    const response = await request(app).get('/api/v1/1973/natural-disasters/country/Colombia');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(mockedVal);
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});

