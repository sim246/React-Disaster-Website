import './App.css';
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard.js';
import DisplayInfo from  './components/DisplayInfo.js';

function App() {
  const [apiInfoDisaster, setApiInfoDisaster] = useState(null);
  const [apiInfoGDP, setApiInfoGDP] = useState(null);

  async function fetchData1() {
    fetch('/api/v1/2012/natural-disasters/country/Japan', {
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
    fetch('/api/v1/2012/gdp?country=Japan', {
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
    fetchData1();
    fetchData2();
  }, []);

  return (
    <div className="app">
      {/* Pass in setSelectedCountry, setSelectedDisaster, setSelectedYear once defined*/}
      <div className="dashboard">
        <Dashboard setSelectedCountry={()=>{}} setSelectedDisaster={()=>{}} 
          setSelectedYear={()=>{}}>
        </Dashboard>
      </div>

      <div className="displayinfo">
        <DisplayInfo disasters={apiInfoDisaster} gdp={apiInfoGDP} />
      </div>
    </div>
  );
}

export default App;
