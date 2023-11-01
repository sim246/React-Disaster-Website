import React, { useState, useEffect } from 'react';

function DisplayApi() {
  const [apiInfo1, setApiInfo1] = useState(null);
  const [apiInfo2, setApiInfo2] = useState(null);

  async function fetchData1() {
    fetch('/api/v1/2001/natural-disasters/type/Flood', {
      method: 'GET',
    }).then((response) => {
      if (!response.ok) {
        throw Error('Data not found');
      }
      return response.json();
    }).then((data) => {
      const info = [];
      for (let i = 0; i < 20; i++){
        info[i] = data[i];
      }
      setApiInfo1(info);
    }).catch((error) => {
      console.log(error);
    });
  }

  async function fetchData2() {
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
      setApiInfo2(info);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(()=>{
    fetchData1();
    fetchData2();
  }, []);

  if (apiInfo1 !== null && apiInfo2 !== null){
    const apis1 = apiInfo1.map((api) => {
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
    const apis2 = apiInfo2.map((api) => {
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
      {apis1}
      {apis2}
    </>;
  } else {
    return<p>Lodading Api Information...</p>;
  }

}

export default DisplayApi;