import React, { useState, useEffect } from 'react';

function DisplayApi() {
  const [apiInfo, setApiInfo] = useState(null);

  async function fetchData() {
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
      setApiInfo(info);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(()=>{
    fetchData();
  }, []);

  if (apiInfo !== null){
    const apis = apiInfo.map((api) => {
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