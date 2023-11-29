import React, { useState, useEffect } from 'react';

function DisplayInfo({year, country, type, marker}) {
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
      setApiInfoDisaster(data);
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
        <div className="disaster" id="disasterInfo"> 
          <h3>{country}</h3>
          <p><b>Year: </b>{year}</p>
          <p><b>Total Number of Disasters: </b>{disasters.length}</p>
          { !marker &&
            <ul>
              {groupTypes}
            </ul>
          }
          <p><b>GDP: </b>Not Defined</p>
          { !marker && 
            <>
              <p><b>GDP per Capita: </b>Not Defined</p>
              <p><b>Total Insured Damages: </b>{addInsuredDamages()} USD</p>
            </>
          }
          <p><b>Total Damages: </b>{addDamages()} USD</p>
        </div> );
    } else if (gdp !== null){
      return(
        <div className="disaster" id="disasterInfo">
          <h3>{country}</h3>
          <p className="bold">Year: </p><p>{year}</p>
          <p className="bold">Total Number of Disasters: {disasters.length}</p>
          <ul>
            { !marker &&
              <ul>
                {groupTypes}
              </ul>
            }
          </ul>
          <p className="bold">GDP: </p><p>{gdp.gdp} USD</p>
          { !marker && 
            <>
              <p className="bold">GDP per Capita: </p><p>{gdp.gdpPerCapita} USD</p>
              <p className="bold">Total Insured Damages: </p><p>{addInsuredDamages()} USD</p>
            </>
          }
          <p className="bold">Total Damages: </p><p>{addDamages()} USD</p>
        </div>);
    }
  } else {
    return<p>Select a year and country!</p>;
  }
}

export default DisplayInfo;