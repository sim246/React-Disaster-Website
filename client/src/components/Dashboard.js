import React, { useState, useEffect } from 'react';

/**
 * @param {function} setSelectedCountry 
 * @param {function} setSelectedDisaster 
 * @param {function} setSelectedYear
 * @returns {component} Dashboard, where the filters, title and description are
 */
export default function Dashboard({ selectedCountry, setSelectedCountry, 
  setSelectedDisaster, setSelectedYear }) {

  //Logic for populating selects with option
  const [disasters, setDisasters] = useState([]);
  const [countries, setCountries] = useState([]);

  async function fetchNaturalDisasters() {
    fetch('/api/v1/natural-disasters', {
      method: 'GET',
    }).then((response) => {
      if (!response.ok) {
        throw Error('Data not found');
      }
      return response.json();
    }).then((data) => {
      setDisasters(data);
    }).catch((error) => {
      //find some way to display error
      return error;
    });
  }

  async function fetchCountries() {
    fetch('/api/v1/countries', {
      method: 'GET',
    }).then((response) => {
      if (!response.ok) {
        throw Error('Data not found');
      }
      return response.json();
    }).then((data) => {
      setCountries(data);
    }).catch((error) => {
      //find some way to display error
      return error;
    });
  }

  useEffect(()=> {
    //Get natural disasters options
    fetchNaturalDisasters();
    //Get country options
    fetchCountries();
  }, []);

  return (
    <>
      <h1> Impact of Natural Disasters on the Economy </h1>
      <p id="intro"> 
        An interactive map used for viewing different GDP per countries, 
        as well as the natural disasters that occur per year. It is meant to 
        demonstrate the impact of natural disasters on the economy through the 
        damages in USD they cause compared to the GDP. 
      </p>
      
      <div className="select">
        <div>
          <label> Year
            <input type="number" min="1970" max="2020" onChange={
              (e) => setSelectedYear(e.target.value)}/>
          </label>
        </div>
        <div>
          <label> Natural disasters
            <select className="child-select" id="naturalDisasterSelect" onChange={
              (e) => setSelectedDisaster(e.target.value)}>
              {disasters.map((disaster) => {
                return (
                  <option value={disaster} key={disaster}>{disaster}</option>
                );
              })}
            </select>
          </label>
        </div>
        <div>
          <label> Country
            <select 
              className="child-select"
              id="countrySelect"
              value={selectedCountry ? selectedCountry : undefined}
              onChange={
                (e) => setSelectedCountry(e.target.value)}>
              {countries.map((country) => {
                return (
                  <option value={country} key={country}>{country}</option>
                );
              })}
            </select>
          </label>
        </div>
      </div>
    </>
  );
}