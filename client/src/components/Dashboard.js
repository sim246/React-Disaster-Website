import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  //Logic for populating selects with option
  const countries = ['Canada', 'Argentina', 'France'];

  const [disasters, setDisasters] = useState([]);
  //const [countries, setCountries] = useState([]);

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

  useEffect(()=> {
    //Get natural disasters options
    fetchNaturalDisasters();

    //Get country options
  }, []);

  return (
    <>
      <h1> Impact of Natural Disasters on Economy </h1>
      <p> 
        An interactive map used for viewing different GDP and GDP per capita, 
        as well as natural disasters in different countries. 
      </p>
  
    
      <label> Year
        <input type="number" min="1970" max="2020" />
      </label>

      <label> Natural disasters
        <select id="naturalDisasterSelect"> 
          {disasters.map((disaster) => {
            return (
              <option value={disaster} key={disaster}>{disaster}</option>
            );
          })}
        </select>
      </label> 

      <label> Country
        <select id="countrySelect">
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