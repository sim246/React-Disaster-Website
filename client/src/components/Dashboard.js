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
      <p> 
        An interactive map used for viewing different GDP and GDP per capita, 
        as well as natural disasters in different countries. 
      </p>
  
    
      <label> Year
        <input type="number" min="1970" max="2020" onChange={
          (e) => setSelectedYear(e.target.value)}/>
      </label>

      <label> Natural disasters
        <select id="naturalDisasterSelect" onChange={
          (e) => setSelectedDisaster(e.target.value)}>
          {disasters.map((disaster) => {
            return (
              <option value={disaster} key={disaster}>{disaster}</option>
            );
          })}
        </select>
      </label> 

      <label> Country
        <select id="countrySelect" value={selectedCountry}
          onChange={
            (e) => setSelectedCountry(e.target.value)}>
          {countries.map((country) => {
            return (
              <option value={country} key={country}>{country}</option>
            );
          })}
        </select>
      </label>
    </>
  );
}