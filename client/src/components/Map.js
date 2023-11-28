import React, { useState, useEffect } from 'react';
import { Icon  } from 'leaflet';
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
import markerImage from '../img/marker-icon.png';

function Map({selectedCountry, setSelectedCountry, selectedYear}) {
  const [map, setMap] = useState(null);
  const [polygons, setPolygons] = useState(null);
  const [defalutPolygons, setDefaultPolygons] = useState(null);
  const [allCountriesData, setAllCountriesData] = useState(null);
  const [earthquakes, setEarthquakes] = useState([]);
  const [gdp, setGDP] = useState(null);

  const customIcon = new Icon({
    iconUrl: markerImage,
    iconSize: [38, 38],
    iconAnchor: [22, 30]
  });
  
  useEffect(() => {
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

  useEffect(() => {
    function makeDefaultPolygons() {
      console.log('making default polygons');
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
        console.log('done making default polygons');
        setDefaultPolygons(polygonsArr);
      });
    }
    if (!defalutPolygons && allCountriesData){
      makeDefaultPolygons();
    }
  }, [allCountriesData, defalutPolygons, setSelectedCountry]);

  useEffect(() => {
    async function fetchGDP() {
      try {
        const response = await fetch(`/api/v1/${selectedYear}/gdp`);
        if (!response.ok) {
          throw new Error(`Got response ${response.status}`);
        }
        const data = await response.json();
        //console.log(`fetched gpd for ${selectedYear}`);
        setGDP(data);
      } catch (error) {
        console.error(`Fetch error: ${error.message}`);
      }
    }
    fetchGDP();
    //console.log('polygons set to default');
    //setPolygons(defalutPolygons);
    //return () => setPolygons(null);
  }, [selectedYear]);

  useEffect(() => {
    function makePolygons() {
      // prepare polygons for each country
      const polygonsArr = [];
      allCountriesData.forEach((item) => {
        // default if no gdp data found
        let colour = 'grey';
        // match country coordinates with gdp dataset
        const gdpData = gdp.filter(gdpItem => gdpItem.country === item.properties.ADMIN)[0];
        // avoid refering to undefined and do not add polygon for countries without data
        if (gdpData && gdpData['gdp']){
          // set appropriate colour
          colour = getColor(gdpData['gdp']);
        }
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
      });
      console.log('setting polygons to year ' + gdp[0].year);
      setPolygons(polygonsArr);
    }
    if (allCountriesData && gdp){
      makePolygons();
    }
    return () => {
      console.log('destroying');
      setPolygons(defalutPolygons);
    };
  }, [allCountriesData, gdp, setSelectedCountry, defalutPolygons]);
  

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
        { console.log(polygons ? polygons[10].props.color : 'null')}
        {polygons}
        
      </MapContainer>
    </div>
  );
}

export default Map;