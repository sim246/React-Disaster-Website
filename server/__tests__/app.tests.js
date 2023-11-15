const request = require('supertest');
const app = require('../api');
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

describe('GET /api/v1/countries/coordinates', () => {
  test('It should respond with a 200 response code', async () => {
    const expectedVal = [{"properties":{"ADMIN":"Aruba"},"geometry":{"coordinates":[[[12.577582098000036,-69.99693762899992]]]}}];
    jest.spyOn(DB.prototype, 'readCountriesWithCoords').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/countries/coordinates');
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
  });
});

describe('GET /api/v1/countries/coordinatessdlkgj', () => {
  test('It should have failed', async () => {
    const expectedVal = {status: '404', message: 'Not found: Error: 404'}
    jest.spyOn(DB.prototype, 'readCountriesWithCoords').mockResolvedValue(expectedVal);
    const response = await request(app).get('/api/v1/countries/coordinatessdlkgj');
    //if plain text, use text, if json use body
    expect(response.body).toEqual(expectedVal);
    expect(response.statusCode).toBe(404);
    expect(response.type).toEqual('application/json');
  });
});

describe('GET /api/v1/countries/Canada', () => {
  test('It should respond with a 200 response code', async () => {
    const expectedVal = [{"_id":"6551714e913bddc62950eb5f","type":"Feature","properties":{"ADMIN":"Canada","ISO_A3":"CAN"}}];
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

describe('GET /api/v1/countries', () => {
  test('It should respond with a json array', async () => {
    const expectedVal =
      ["Afghanistan","Akrotiri Sovereign Base Area","Aland","Albania","Algeria","American Samoa","Andorra",
      "Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Ashmore and Cartier Islands",
      "Australia","Austria","Azerbaijan","Bahrain","Bajo Nuevo Bank (Petrel Is.)","Bangladesh","Barbados","Baykonur Cosmodrome",
      "Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil",
      "British Indian Ocean Territory","British Virgin Islands","Brunei","Bulgaria","Burkina Faso",
      "Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic",
      "Chad","Chile","China","Clipperton Island","Colombia","Comoros","Cook Islands",
      "Coral Sea Islands","Costa Rica","Croatia","Cuba","Curaçao","Cyprus","Cyprus No Mans Area","Czech Republic","Democratic Republic of the Congo",
      "Denmark","Dhekelia Sovereign Base Area","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea",
      "Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Federated States of Micronesia","Fiji","Finland","France","French Polynesia",
      "French Southern and Antarctic Lands","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala",
      "Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Heard Island and McDonald Islands","Honduras","Hong Kong S.A.R.","Hungary","Iceland","India",
      "Indian Ocean Territories","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Ivory Coast","Jamaica","Japan","Jersey","Jordan",
      "Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon",
      "Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao S.A.R","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta",
      "Marshall Islands","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru",
      "Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","North Korea","Northern Cyprus","Northern Mariana Islands",
      "Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn Islands","Poland","Portugal","Puerto Rico","Qatar",
      "Republic of Congo","Republic of Serbia","Romania","Russia","Rwanda","Saint Barthelemy","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Martin",
      "Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Scarborough Reef","Senegal","Serranilla Bank",
      "Seychelles","Siachen Glacier","Sierra Leone","Singapore","Sint Maarten","Slovakia","Slovenia","Solomon Islands","Somalia","Somaliland","South Africa","South Georgia and South Sandwich Islands",
      "South Korea","South Sudan","Spain","Spratly Islands","Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Thailand","The Bahamas","Togo","Tonga","Trinidad and Tobago",
      "Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","US Naval Base Guantanamo Bay","Uganda","Ukraine","United Arab Emirates","United Kingdom","United Republic of Tanzania",
      "United States Minor Outlying Islands","United States Virgin Islands","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican","Venezuela",
      "Vietnam","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"];
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