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

function Map({selectedCountry, setSelectedCountry}) {
  const [map, setMap] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [allCountriesData, setAllCountriesData] = useState(null);
  const [earthquakes, setEarthquakes] = useState([]);

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
        setAllCountriesData(null);
        setCountryData(data[0]);
      } catch (error) {
        console.error(`Fetch error: ${error.message}`);
      }
    }
    // slow for now
    async function fetchAllCountries() {
      try {
        const response = await fetch(`/api/v1/countries/coordinates`);
        if (!response.ok) {
          throw new Error(`Got response ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setAllCountriesData(data);
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
    if (selectedCountry){
      fetchCountry();
    } else {
      fetchAllCountries();
    }
    fetchEarthquakes();

  }, [selectedCountry]);

  // prepare polygons for each country
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
                <Marker position={[earthquake.latitude, earthquake.longitude]} icon={customIcon} >
                  <Popup><p>⚠️</p></Popup>
                </Marker>
              );
            }
          })
        }
        <Legend map={map} />
        {countryData &&
          <Polygon
            pathOptions={{fillColor: 'blue'}}
            positions={countryData.geometry.coordinates}
            eventHandlers={{
              click: () => {
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