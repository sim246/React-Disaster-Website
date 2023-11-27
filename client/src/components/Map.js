import React, { useState, useEffect } from 'react';
import { Icon  } from 'leaflet';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polygon
} from 'react-leaflet';
import Legend from './Legend';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import markerImage from '../img/marker-icon.png';

function Map({selectedCountry, setSelectedCountry, selectedYear}) {
  const [map, setMap] = useState(null);
  //const [countryData, setCountryData] = useState(null);
  const [allCountriesData, setAllCountriesData] = useState(null);
  const [earthquakes, setEarthquakes] = useState([]);
  const [gdp, setGDP] = useState(null);

  const customIcon = new Icon({
    iconUrl: markerImage,
    iconSize: [38, 38],
    iconAnchor: [22, 30]
  });
  

  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await fetch(`/api/v1/countries/${selectedCountry}`);
        if (!response.ok) {
          throw new Error(`Got response ${response.status}`);
        }
        const data = await response.json();
        setCountryData(data[0]);
      } catch (error) {
        console.error(`Fetch error: ${error.message}`);
      }
    }
    
    async function fetchEarthquakes() {
      //year set automatically for now
      fetch('/api/v1/2012/natural-disasters/type/Earthquake', {
        method: 'GET',
      }).then((response) => {
        if (!response.ok) {
          throw Error('Data not found');
        }
        return response.json();
      }).then((data) => {
        setEarthquakes(data);
      }).catch((error) => {
        return error;
      });
    }
    // if (selectedCountry){
    //   fetchCountry();
    // }
    fetchEarthquakes();

  }, [selectedCountry]);

  useEffect(() => {
    // slow for now
    async function fetchAllCountries() {
      try {
        const response = await fetch(`/api/v1/countries/coordinates`);
        if (!response.ok) {
          throw new Error(`Got response ${response.status}`);
        }
        const data = await response.json();
        //console.log('fetched allCountries');
        setAllCountriesData(data);
      } catch (error) {
        console.error(`Fetch error: ${error.message}`);
      }
    }
    fetchAllCountries();
  }, []);

  useEffect (() => {
    async function fetchGDP() {
      try {
        const response = await fetch(`/api/v1/${selectedYear}/gdp`);
        if (!response.ok) {
          throw new Error(`Got response ${response.status}`);
        }
        const data = await response.json();
        console.log(`fetched gpd for ${selectedYear}`);
        setGDP(data);
      } catch (error) {
        console.error(`Fetch error: ${error.message}`);
      }
    }
    fetchGDP();
  }, [selectedYear]);

  // prepare polygons for each country
  const polygons = [];
  if (allCountriesData && gdp){
    allCountriesData.forEach((item) => {
      // default if no gdp data found
      let colour = 'grey';
      // default if country not selected
      //let borderColour = 'grey';
      // match country coordinates with gdp dataset
      const gdpData = gdp.filter(gdpItem => gdpItem.country === item.properties.ADMIN)[0];
      // avoid refering to undefined and do not add polygon for countries without data
      if (gdpData && gdpData['gdp']){
        // set appropriate colour
        colour = 'red';
        /*if (selectedCountry === item.properties.ADMIN){
          borderColour = colour;
          console.log(`set border for selected country ${selectedCountry} now its ${borderColour}`);
        }*/
        //console.log(`gdp for ${item.properties.ADMIN} == ${gdpData['gdp']}`);
        //console.log(selectedCountry);
        //console.log(item.properties.ADMIN);
        //console.log(selectedCountry === item.properties.ADMIN);
      }
      // else return;
      //console.log(`before push for ${item.properties.ADMIN} - ${borderColour};
      //  selected country: ${selectedCountry}`);
      polygons.push(
        <Polygon
          positions={item.geometry.coordinates}
          fillColor={colour}
          color={colour}
          eventHandlers={{
            click: (e) => {
              setSelectedCountry(item.properties.ADMIN);
            }
          }}
          key={item.properties.ADMIN}
        />);
    });
  }

  return (
    <div id="map-container">
      <MapContainer 
        center={[45.5, -73.6]}
        zoom={4}
        zoomControl={true}
        updateWhenZooming={false}
        updateWhenIdle={true}
        preferCanvas={true}
        minZoom={1}
        maxZoom={16}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy;
            <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {earthquakes.length > 0 && 
          earthquakes.map((earthquake) => {
            if (earthquake.country === selectedCountry) {
              return (
                <Marker
                  position={[earthquake.latitude, earthquake.longitude]}
                  icon={customIcon}
                  key={earthquake} >
                  <Popup><p>⚠️</p></Popup>
                </Marker>
              );
            } else return null;
          })
        }
        <Legend map={map} />
        {/* {countryData &&
          <Polygon
            pathOptions={{fillColor: 'blue'}}
            positions={countryData.geometry.coordinates}
            eventHandlers={{
              click: () => {
                setCountryData(null);
                setSelectedCountry(null);
              }
            }}
          />
        } */}
        {allCountriesData &&
          polygons
        }
        
      </MapContainer>
    </div>
  );
}

export default Map;