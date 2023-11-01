const request = require('supertest');
const app = require('../api');
const DB = require('../db/db');

jest.mock('../db/db');

describe('GET /api/v1/1973/natural-disasters/Colombia', () => {
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
    jest.spyOn(DB.prototype, 'readAll').mockResolvedValue(mockedVal);
    const response = await request(app).get('/quotes');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(mockedVal);
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});

describe('POST /quote ', () => {
  test('It should respond with a 201', async () => {
    jest.spyOn(DB.prototype, 'create').mockResolvedValue(
      {insertedId: '1'});
    const response = await request(app).
      post('/new-quote').
      send({quote: 'dunno', author: 'me'}).
      set('Accept', 'application/json');
    //if plain text, use text, if json use body
    expect(response.text).toEqual('Quote added');
    expect(response.statusCode).toBe(201);
  });
});
