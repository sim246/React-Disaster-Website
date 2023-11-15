import React, { useState, useEffect } from 'react';

function DisplayInfoType({year, type}) {
  const [typeCount, setTypeCount] = useState(0);
  const [disasters, setApiInfoDisaster] = useState(null);

  async function fetchDataDisastersCount() {
    fetch('/api/v1/' + year + '/natural-disasters/type/' + type, {
      method: 'GET',
    }).then((response) => {
      if (!response.ok) {
        throw Error('Data not found');
      }
      return response.json();
    }).then((data) => {
      setTypeCount(data.length);
      const info = [];
      for (let i = 0; i < data.length; i++){
        info[i] = data[i];
      }
      setApiInfoDisaster(info);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(()=>{
    if (year !== null && type !== null){
      if (year >= 1970 && year <= 2021){
        fetchDataDisastersCount();
      }
    }
  }, [year, type]);
  
  if (type !== null && year !== null){
    if (disasters !== null) {
      function addInsuredDamages(){
        let insured = 0;
        for (let i = 0; i < disasters.length; i++){
          if(disasters[i].insuredDamages) {
            insured = insured + parseInt(disasters[i].insuredDamages);
          }
        }
        return insured;
      }

      function addDamages(){
        let damages = 0;
        for (let i = 0; i < disasters.length; i++){
          if(disasters[i].damages) {
            damages = damages + parseInt(disasters[i].damages);
          }
        }
        return damages;
      }

      return<>
        <p>The total number of {type} across the gloab in {year} was {typeCount}. 
        The total amount of insured damages was {addInsuredDamages()} USD 
        and the total amount of damages was {addDamages()} USD</p>
      </>;
    }
  } else {
    return<p>Select a disaster type and year!</p>;
  }
}

export default DisplayInfoType;