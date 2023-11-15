import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon
} from 'react-leaflet';
import Legend from './Legend';
import 'leaflet/dist/leaflet.css';
import './Map.css';

function Map({selectedCountry, setSelectedCountry}) {
  const [map, setMap] = useState(null);
  const [countryData, setCountryData] = useState(null);

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
    if (selectedCountry) {
      fetchCountry();
    }
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
        <Legend map={map} />
        {countryData &&
          <Polygon
            pathOptions={{fillColor: 'blue'}}
            positions={countryData.geometry.coordinates}
            eventHandlers={{
              click: () => {
                setSelectedCountry(countryData.properties.ADMIN);
              }
            }}
          />
        }
        
      </MapContainer>
    </div>
  );
}

export default Map;