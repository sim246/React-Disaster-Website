import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  //Logic for populating selects with option
  const countries = ['Canada', 'Argentina', 'France'];
  const naturalDisasters = ['Flood', 'Storm', 'Earthquake', 'Epidemic', 'Landslide', 'Wildfire', 
    'Volcanic activity', 'Mass movement (dry)', 'Insect infestation', 'Animal accident', 
    'Drought', 'Extreme temperature'];
  /*useEffect(()=> {
    //Get year min & max

    //Get natural disasters options

    //Get country options
  }, []);*/

  return (
    <>
      <h1> Impact of Natural Disasters on Economy </h1>
      <p> Description </p>
  
      <label> Year
        <input type="number" min="1970" max="2020" value="2020" />
      </label>
      <select id="naturalDisasterSelect"> 
        {naturalDisasters.map((disaster) => {
          return (
            <option value={disaster} key={disaster}>{disaster}</option>
          );
        })}
      </select>
      <select id="countrySelect">
        {countries.map((country) => {
          return (
            <option value={country} key={country}>{country}</option>
          );
        })}
      </select>
    </>
  );
}