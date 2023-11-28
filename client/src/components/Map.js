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
import DisplayInfo from  './DisplayInfo.js';
import markerImage from '../img/marker-icon.png';
//import clearMarkers from 'leaflet';

function Map({selectedCountry, setSelectedCountry, selectedYear, selectedType}) {
  const [map, setMap] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [allCountriesData, setAllCountriesData] = useState(null);
  const [earthquakes, setEarthquakes] = useState([]);
  

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
      const customIcon = new Icon({
        iconUrl: markerImage,
        iconSize: [38, 38],
        iconAnchor: [22, 30]
      });

      //year set automatically for now
      fetch(`/api/v1/${selectedYear}/natural-disasters/type/Earthquake`, {
        method: 'GET',
      }).then((response) => {
        if (!response.ok) {
          throw Error('Data not found');
        }
        return response.json();
      }).then((data) => {
        //Make the markers objects for the map
        const earthquakeMarkers = data.filter((earthquake) => 
          earthquake.country === selectedCountry).map((earthquake) => 
          <Marker
            position={[earthquake.latitude, earthquake.longitude]}
            icon={customIcon}
            key={earthquake.id}
            className="earthquake"
          >
            <Popup>
              <p>⚠️</p>
            </Popup>
          </Marker>
        );
        setEarthquakes(earthquakeMarkers);
      }).catch((error) => {
        return error;
      });
    }
    if (selectedCountry){
      fetchCountry();
    }
    if (selectedYear && selectedCountry) {
      fetchEarthquakes();
    }

    // Cleanup function to remove earthquake markers
    return () => setEarthquakes([]);
  }, [selectedCountry, selectedYear]);

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

  // prepare polygons for each country as well as their popups
  const polygons = [];
  if (allCountriesData){
    allCountriesData.forEach((item) => {
      polygons.push(
        <Polygon
          positions={item.geometry.coordinates}
          eventHandlers={{
            click: () => {
              setSelectedCountry(item.properties.ADMIN);
            }
          }}
          key={item.properties.ADMIN}
        >
          <Popup className="country-popup">{selectedCountry}
            <DisplayInfo year={selectedYear}
              country={selectedCountry}
              type={selectedType}
              marker={true}>
            </DisplayInfo>
            <a href="#disasterInfo"> <p> Read more info </p> </a>
          </Popup>
        </Polygon>);
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
            return earthquake;
          })
        }
        <Legend map={map} />
        {countryData &&
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
        }
        {allCountriesData &&
          polygons
        }
        
      </MapContainer>
    </div>
  );
}

export default Map;