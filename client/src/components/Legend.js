import { useEffect } from 'react';
import L from 'leaflet';
import './Legend.css';

const grades = [0, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 150000000000];

function Legend({ map }) {
  useEffect(() => {
    if (map) {
      const legend = L.control({ position: 'bottomright' });
  
      legend.onAdd = () => {
        const div = L.DomUtil.create('div');
        // TODO: update this
        div.id = 'legend-container';
        div.innerHTML += '<h4>GDP in $</h4>';
        div.innerHTML +=
                '<i style="background: grey"></i> No Data<br>';
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
    
        return div;
      };
  
      legend.addTo(map);
    }
  }, [map]);
  return null;
}
// TODO: update this as well
export function getColor(d) {
  return d > grades[7] ? '#005a32' :
    d > grades[6]  ? '#238443' :
      d > grades[5]  ? '#41ab5d' :
        d > grades[4]  ? '#78c679' :
          d > grades[3]   ? '#addd8e' :
            d > grades[2]   ? '#d9f0a3' :
              d > grades[1]   ? '#f7fcb9' :
                '#ffffe5';
}

export default Legend;