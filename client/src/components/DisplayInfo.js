import React, { useState, useEffect } from 'react';

/**
 * Detailed Info component used to display GDP and Natural Disaster facts about a country
 * @param {Object} props year, country and a bool indicating whether it's in a popup
 * @returns 
 */
function DisplayInfo({year, country, marker}) {
  const [disasters, setApiInfoDisaster] = useState(null);
  const [gdp, setApiInfoGDP] = useState(null);
  const [countryNameFull, setCountryNameFull] = useState(null);
  
  useEffect(()=>{
    async function fetchDataDisasters() {
      let ignore = false;
      fetch('/api/v1/' + year + '/natural-disasters/country/' + country, {
        method: 'GET',
      }).then((response) => {
        if (!response.ok) {
          throw Error('Data not found');
        }
        return response.json();
      }).then((data) => {
        if(!ignore) {
          setApiInfoDisaster(data);
        }
      }).catch((error) => {
        return error;
      });
      return () => {
        ignore = true;
      };
    }
  
    async function fetchDataGDP() {
      let ignore = false;
      fetch('/api/v1/' + year + '/gdp?country=' + country, {
        method: 'GET',
      }).then((response) => {
        if (!response.ok) {
          throw Error('Data not found');
        }
        return response.json();
      }).then((data) => {
        if(!ignore) {
          setApiInfoGDP(data[0]);
        }
      }).catch((error) => {
        return error;
      });
      return () => {
        ignore = true;
      };
    }
    
    if (year !== null && country !== null){
      if (year >= 1970 && year <= 2021){
        fetchDataDisasters();
        fetchDataGDP();
      }
    }
  }, [year, country]);

  useEffect(() => {
    async function fetchCountryName() {
      let ignore = false;
      fetch(`/api/v1/countries/${country}/name`, {
        method: 'GET',
      }).then((response) => {
        if (!response.ok) {
          throw Error('Data not found');
        }
        return response.json();
      }).then((data) => {
        if(!ignore) {
          setCountryNameFull(data[0]['properties']['ADMIN']);
        }
      }).catch((error) => {
        return error;
      });
      return () => {
        ignore = true;
      };
    }
    fetchCountryName();
  }, [country]);
  
  if (disasters !== null){
    const groupTypes = disasters.map((disaster) => {
      return <React.Fragment key={disaster.id}>
        <li>Subgroup: {disaster.subgroup}
          <ul>
            <li>Type: {disaster.type}</li>
          </ul>
        </li>
      </React.Fragment>;
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
      <div className="disaster" id="disasterInfo">
        <h3>{countryNameFull}</h3>
        <p className="bold">Year: </p><p>{year}</p>
        <p className="bold">Total Number of Disasters: {disasters.length}</p>
        <ul>
          { !marker &&
              <ul key={'group-types'}>
                {groupTypes}
              </ul>
          }
        </ul>
        <p className="bold">GDP: </p>
        <p>{gdp && gdp.gdp !== '' ? gdp.gdp + ' USD' : 'No Data Available'}</p>
        { !marker && gdp && gdp.gdp !== '' && 
            <>
              <p className="bold">GDP per Capita: </p><p>{gdp.gdpPerCapita} USD</p>
              <p className="bold">Total Insured Damages: </p><p>{addInsuredDamages()} USD</p>
            </>
        }
        <p className="bold">Total Damages: </p><p>{addDamages()} USD</p>
      </div>
    );
  } else {
    return<p>Select a year and country!</p>;
  }
}

export default DisplayInfo;