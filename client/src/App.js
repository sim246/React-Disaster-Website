import './App.css';


import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard.js';
import DisplayInfo from  './components/DisplayInfo.js';
import Map from './components/Map.js';

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  

  return (
    <div className="app">
      {/* Pass in setSelectedCountry, setSelectedDisaster, setSelectedYear once defined*/}
      <div className="dashboard">
        <Dashboard
          setSelectedCountry={setSelectedCountry}
          setSelectedDisaster={setSelectedDisaster} 
          setSelectedYear={setSelectedYear}>
        </Dashboard>
      </div>
      <div className="map">
        <Map
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      </div>

      <div className="displayinfo">
        <DisplayInfo year={selectedYear} country={selectedCountry} />
      </div>
    </div>
  );
}

export default App;
