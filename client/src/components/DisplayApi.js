import React, { useState, useEffect } from 'react';

function DisplayApi() {
  const [apiInfoDisaster, setApiInfoDisaster] = useState(null);
  const [apiInfoGDP, setApiInfoGDP] = useState(null);

  async function fetchData1() {
    fetch('/api/v1/2001/natural-disasters/country/Canada', {
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

  async function fetchData2() {
    fetch('/api/v1/2012/gdp?country=Canada', {
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
      setApiInfoGDP(info);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(()=>{
    fetchData1();
    fetchData2();
  }, []);

  if (apiInfoDisaster !== null && apiInfoGDP !== null){
    const apis = apiInfoDisaster.map((api) => {
      return <div className="disaster">
        <p>Year: {api.year}</p>
        <p>Subgroup: {api.subgroup}</p>
        <p>Type: {api.type}</p>
        <p>Country: {api.country}</p>
        <p>Country Code: {api.countryCode}</p>
        <p>Latitude: {api.latitude}</p>
        <p>Longitude: {api.longitude}</p>
        <p>Insured Damages: {api.insuredDamages}</p>
        <p>Damages: {api.damages}</p>
      </div>;
    });
    return<>
      {apis}
    </>;
  } else {
    return<p>Lodading Api Information...</p>;
  }

}

export default DisplayApi;