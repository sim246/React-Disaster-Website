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

function Map({selectedCountry}) {
  const [map, setMap] = useState(null);
  const [borders, setBorders] = useState([]);
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
        setBorders(data[0].geometry.coordinates);
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

    fetchCountry();
    fetchEarthquakes();

  }, [selectedCountry]);

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
        {borders &&
          <Polygon
            pathOptions={{fillColor: 'blue'}}
            positions={borders}
          />
        }
        
      </MapContainer>
    </div>
  );
}

export default Map;