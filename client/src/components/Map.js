import React, { useState, useEffect } from 'react';
import { Icon } from 'leaflet';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polygon
} from 'react-leaflet';
import Legend, { getColor } from './Legend';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import DisplayInfo from  './DisplayInfo.js';
import markerImage from '../img/marker-icon.png';

function Map({selectedCountry, setSelectedCountry, selectedYear, selectedType}) {
  const [map, setMap] = useState(null);
  const [polygons, setPolygons] = useState(null);
  const [defaultPolygons, setDefaultPolygons] = useState(null);
  const [allCountriesData, setAllCountriesData] = useState(null);
  const [earthquakes, setEarthquakes] = useState([]);
  const [gdp, setGDP] = useState(null);
  
  useEffect(() => {
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
          earthquake.country === selectedCountry).map((earthquake) => {
          if (earthquake.latitude !== null && earthquake.longitude !== null) {
            return <Marker
              position={[earthquake.latitude, earthquake.longitude]}
              icon={customIcon}
              key={earthquake.id}
              className="earthquake"
            >
              <Popup>
                <p>Earthquake</p>
              </Popup>
            </Marker>;
          }
          return null;
        });
        setEarthquakes(earthquakeMarkers);
      }).catch((error) => {
        return error;
      });
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
        setAllCountriesData(data);
      } catch (error) {
        console.error(`Fetch error: ${error.message}`);
      }
    }
    fetchAllCountries();
  }, []);

  useEffect(() => {
    function makeDefaultPolygons() {
      // prepare polygons for each country
      const polygonsArr = [];
      allCountriesData.forEach((item) => {
        const colour = 'grey';
        polygonsArr.push(
          <Polygon
            positions={item.geometry.coordinates}
            fillColor={colour}
            fillOpacity={0.8}
            color={colour}
            eventHandlers={{
              click: (e) => {
                setSelectedCountry(item.properties.ADMIN);
              }
            }}
            key={item.properties.ADMIN}
          />);
        setDefaultPolygons(polygonsArr);
      });
    }
    if (allCountriesData){
      makeDefaultPolygons();
    }
    // makes grey polygons when fetching all countries borders is finished
  }, [allCountriesData, setSelectedCountry]);

  useEffect(() => {
    async function fetchGDP() {
      try {
        const response = await fetch(`/api/v1/${selectedYear}/gdp`);
        if (!response.ok) {
          throw new Error(`Got response ${response.status}`);
        }
        const data = await response.json();
        setGDP(data);
      } catch (error) {
        console.error(`Fetch error: ${error.message}`);
      }
    }
    if (selectedYear){
      fetchGDP();
    }
    return () => {
      // causes flicker but updates the colours
      setPolygons(null);
    };
  }, [selectedYear]);

  useEffect(() => {
    function makePolygons() {
      // prepare polygons for each country as well as their popups
      const polygonsArr = [];
      allCountriesData.forEach((item) => {
        let colour;
        // match country coordinates with gdp dataset
        const gdpData = gdp.filter(gdpItem => gdpItem.country === item.properties.ADMIN)[0];
        // avoid refering to undefined and do not add polygon for countries without data
        if (gdpData && gdpData['gdp']){
          // set appropriate colour
          colour = getColor(gdpData['gdp']);
        } else return;
        polygonsArr.push(
          <Polygon
            positions={item.geometry.coordinates}
            fillColor={colour}
            fillOpacity={0.8}
            color={colour}
            eventHandlers={{
              click: (e) => {
                setSelectedCountry(item.properties.ADMIN);
              }
            }}
            key={item.properties.ADMIN}
          >
            <Popup className="country-popup">{item.properties.ADMIN}
              <DisplayInfo year={selectedYear}
                country={item.properties.ADMIN}
                type={selectedType}
                marker={true}>
              </DisplayInfo>
              <a href="#disasterInfo"> <p> Read more info </p> </a>
            </Popup>
          </Polygon>);
      });
      setPolygons(polygonsArr);
    }
    if (allCountriesData && gdp){
      makePolygons();
    }
    return () => setPolygons(null);
    // makes coloured polygons when borders and gdp are fetched (when year is changed)
  }, [allCountriesData, gdp, setSelectedCountry, selectedType, selectedYear]);

  return (
    <div id="map-container">
      <MapContainer 
        center={[45.5, -73.6]}
        zoom={2}
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
        {defaultPolygons}
        {polygons}
      </MapContainer>
    </div>
  );
}

export default Map;