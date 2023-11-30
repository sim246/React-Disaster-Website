const request = require('supertest');
const app = require('../server');
const DB = require('../db/db');

jest.mock('../db/db');

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


//Test disasters per year per type of disaster
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

//Test getting natural disasters
describe('GET /api/v1/natural-disasters', () => {
  test('It should respond with a json array', async () => {
    const expectedVal = ['Animal accident', 'Drought', 'Earthquake', 'Epidemic',
      'Extreme temperature', 'Flood', 'Glacial lake outburst', 'Impact',
      'Insect infestation', 'Landslide', 'Mass movement (dry)', 'Storm',
      'Volcanic activity', 'Wildfire'];
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

//Test getting country coordinates
describe('GET /api/v1/countries/coordinates', () => {
  test('It should respond with a 200 response code', async () => {
    const expectedVal = [{'properties':{'ADMIN':'Aruba'}, 'geometry':
      {'coordinates':[[[12.577582098000036, -69.99693762899992]]]}}];
    jest.spyOn(DB.prototype, 'readCountriesWithCoords').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/countries/coordinates');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});

describe('GET /api/v1/countriess/coordinatessdlkgj', () => {
  test('It should have failed', async () => {
    const expectedVal = {status: '404', message: 'Sorry cant find that!'};
    jest.spyOn(DB.prototype, 'readCountriesWithCoords').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/countriess/coordinatessdlkgj');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(expectedVal);
    expect(response.statusCode).toBe(404);
    expect(response.type).toEqual('application/json');
  });
});

//Test getting coordinates for specific countries
describe('GET /api/v1/countries/Canada', () => {
  test('It should respond with a 200 response code', async () => {
    const expectedVal = [{'_id':'6551714e913bddc62950eb5f', 'type':'Feature', 'properties':
      {'ADMIN':'Canada', 'ISO_A3':'CAN'}}];
    jest.spyOn(DB.prototype, 'readCountry').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/countries/Canada');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});

describe('GET /api/v1/countriessdf/aapfoa', () => {
  test('It should have failed', async () => {
    const expectedVal = {status: '404', message: 'Sorry cant find that!'};
    jest.spyOn(DB.prototype, 'readCountry').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/countriessdf/aapfoa');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(expectedVal);
    expect(response.statusCode).toBe(404);
    expect(response.type).toEqual('application/json');
  });
});

//Test getting list of countries
describe('GET /api/v1/countries', () => {
  test('It should respond with a json array', async () => {
    const expectedVal =
      ['Afghanistan', 'Akrotiri Sovereign Base Area', 'Aland', 'Albania', 'Algeria',
        'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica',
        'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Ashmore and Cartier Islands',];
    jest.spyOn(DB.prototype, 'readCountries').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/countries');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(expectedVal);
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});

describe('GET /api/v1/countriesanfka', () => {
  test('It should have failed', async () => {
    const expectedVal = {status: '404', message: 'Sorry cant find that!'};
    jest.spyOn(DB.prototype, 'readCountry').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/countriesanfka');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(expectedVal);
    expect(response.statusCode).toBe(404);
    expect(response.type).toEqual('application/json');
  });
});

//Test getting a country name with a given country code
describe('GET /api/v1/countries/CAN/name', () => {
  test('It should respond with a json array', async () => {
    const expectedVal =
      [
        {
            "properties": {
                "ADMIN": "Canada"
            }
        }
    ];
    jest.spyOn(DB.prototype, 'readCountryName').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/countries/CAN/name');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(expectedVal);
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});

describe('GET /api/v1/countries/CAD/name', () => {
  test('It should have failed', async () => {
    const expectedVal = {status: '404', message: 'Not found in db'};
    jest.spyOn(DB.prototype, 'readCountryName').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/countries/CAD/name');
    //if plain text, use text, if json use body
    await expect(response.body).toEqual(expectedVal);
    await expect(response.type).toEqual('application/json');
  });
});