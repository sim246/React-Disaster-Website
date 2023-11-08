import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  //Logic for populating selects with option
  countries = ["Canada", "Argentina", "France"];
  naturalDisasters = ['Flood', 'Storm', 'Earthquake', 'Epidemic', 'Landslide', 'Wildfire', 
    'Volcanic activity', 'Mass movement (dry)', 'Insect infestation', 'Animal accident', 
    'Drought', 'Extreme temperature'];
  /*useEffect(()=> {
    //Get year min & max

    //Get natural disasters options

    //Get country options
  }, []);*/

  naturalDisasterSelect = <select id="naturalDisasterSelect"> </select>;
  for (let disaster in naturalDisasters) {
    const option = <option value={disaster} key={disaster}>{disaster}</option>;
    naturalDisastersSelect.appendChild(option);
  }

  countrySelect = <select id="countrySelect"> </select>;
  for (let country in countries) {
    const option = <option value={country} key={country}>{country}</option>;
    countrySelect.appendChild(option);
  }

  return (
    <>
      <h1> Impact of Natural Disasters on Economy </h1>
      <p> Description </p>
  
      <input type="number" min="1970" max="2020" step="1" value="2020" />
      {naturalDisasterSelect}
      {countrSelect}
    </>
  );
}