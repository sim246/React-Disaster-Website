import React, { useState, useEffect } from 'react';

function DisplayInfo({disasters, gdp}) {

  if (disasters !== null && gdp !== null){
    const groupTypes = disasters.map((disaster) => {
      return <>
        <li>Subgroup: {disaster.subgroup}
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

    return(
      <div className="disaster">
        <h3>{disasters[0].country}</h3>
        <p><b>Year: </b>{disasters[0].year}</p>
        <p><b>Total Number of Disasters: </b>{disasters.length}</p>
        <ul>
          {groupTypes}
        </ul>
        <p><b>GDP: </b>{gdp.gdp} USD</p>
        <p><b>GDP per Capita: </b>{gdp.gdpPerCapita} USD</p>
        <p><b>Total Insured Damages: </b>{addInsuredDamages()} USD</p>
        <p><b>Total Damages: </b>{addDamages()} USD</p>
      </div>);
  } else {
    return<p>Select a year and country!</p>;
  }
}

export default DisplayInfo;