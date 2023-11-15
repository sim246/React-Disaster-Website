import React, { useState, useEffect } from 'react';

function DisplayInfo({year, country, type}) {
  const [disasters, setApiInfoDisaster] = useState(null);
  const [gdp, setApiInfoGDP] = useState(null);

  async function fetchDataDisasters() {
    fetch('/api/v1/' + year + '/natural-disasters/country/' + country, {
      method: 'GET',
    }).then((response) => {
      if (!response.ok) {
        throw Error('Data not found');
      }
      return response.json();
    }).then((data) => {
      const info = [];
      for (let i = 0; i < data.length; i++){
        info[i] = data[i];
      }
      setApiInfoDisaster(info);
    }).catch((error) => {
      console.log(error);
    });
  }

  async function fetchDataGDP() {
    fetch('/api/v1/' + year + '/gdp?country=' + country, {
      method: 'GET',
    }).then((response) => {
      if (!response.ok) {
        throw Error('Data not found');
      }
      return response.json();
    }).then((data) => {
      setApiInfoGDP(data[0]);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(()=>{
    if (year !== null && country !== null){
      if (year >= 1970 && year <= 2021){
        fetchDataDisasters();
        fetchDataGDP();
      }
    }
  }, [year, country]);
  
  if (disasters !== null){
    const groupTypes = disasters.map((disaster) => {
      return <>
        <li key={disaster._id.toString()}>Subgroup: {disaster.subgroup}
          <ul>
            <li>Type: {disaster.type}</li>
          </ul>
        </li>
      </>;
    });

    function addInsuredDamages(){
      let insured = 0;
      for (let i = 0; i < disasters.length; i++){
        if(disasters[i].insuredDamages) {
          insured = insured + parseInt(disasters[i].insuredDamages);
        }
      }
      return insured;
    }

    function addDamages(){
      let damages = 0;
      for (let i = 0; i < disasters.length; i++){
        if(disasters[i].damages) {
          damages = damages + parseInt(disasters[i].damages);
        }
      }
      return damages;
    }

    if (gdp === undefined){
      return(
        <div className="disaster">
          <h3>{country}</h3>
          <p><b>Year: </b>{year}</p>
          <p><b>Total Number of Disasters: </b>{disasters.length}</p>
          <ul>
            {groupTypes}
          </ul>
          <p><b>GDP: </b>Not Defined</p>
          <p><b>GDP per Capita: </b>Not Defined</p>
          <p><b>Total Insured Damages: </b>{addInsuredDamages()} USD</p>
          <p><b>Total Damages: </b>{addDamages()} USD</p>
        </div>);
    } else if (gdp !== null){
      return(
        <div className="disaster">
          <h3>{country}</h3>
          <p><b>Year: </b>{year}</p>
          <p><b>Total Number of Disasters: </b>{disasters.length}</p>
          <ul>
            {groupTypes}
          </ul>
          <p><b>GDP: </b>{gdp.gdp} USD</p>
          <p><b>GDP per Capita: </b>{gdp.gdpPerCapita} USD</p>
          <p><b>Total Insured Damages: </b>{addInsuredDamages()} USD</p>
          <p><b>Total Damages: </b>{addDamages()} USD</p>
        </div>);
    }
  } else {
    return<p>Select a year and country!</p>;
  }
}

export default DisplayInfo;