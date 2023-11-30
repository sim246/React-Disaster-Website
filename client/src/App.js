import './App.css';


import React, { useState } from 'react';
import Dashboard from './components/Dashboard.js';
import DisplayInfo from  './components/DisplayInfo.js';
import DisplayInfoType from  './components/DisplayInfoType.js';
import Map from './components/Map.js';
/**
 * Main app component, containing Dashboard, Map, DisplayInfo and DisplayInfoType
 * @returns 
 */
function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);  

  return (
    <div className="app">
      {/* Pass in setSelectedCountry, setSelectedDisaster, setSelectedYear once defined*/}
      <div className="dashboard">
        <Dashboard
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          setSelectedDisaster={setSelectedDisaster} 
          setSelectedYear={setSelectedYear}>
        </Dashboard>
      </div>
      <div className="map">
        <Map
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedYear={selectedYear}
        />
      </div>

      <div className="displayinfo">
        <DisplayInfo year={selectedYear} country={selectedCountry} />
      </div>

      <div className="displayinfo">
        <DisplayInfoType year={selectedYear} type={selectedDisaster} />
      </div>
    </div>
  );
}

export default App;
