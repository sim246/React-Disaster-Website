import React, { useState, useEffect } from 'react';

function DisplayInfoType({year, type}) {
  const [typeCount, setTypeCount] = useState(0);
  const [disasters, setApiInfoDisaster] = useState(null);

  useEffect(()=>{
    async function fetchDataDisastersCount() {
      let ignore = false;
      fetch('/api/v1/' + year + '/natural-disasters/type/' + type, {
        method: 'GET',
      }).then((response) => {
        if (!response.ok) {
          throw Error('Data not found');
        }
        return response.json();
      }).then((data) => {
        if(!ignore) {
          setTypeCount(data.length);
          setApiInfoDisaster(data);
        }
      }).catch((error) => {
        console.log(error);
      });
      return () => {
        ignore = true;
      };
    }
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

      return <p>The total number of disaters typed {type} 
        across the globe in {year} was {typeCount}. 
        The total amount of insured damages was {addInsuredDamages()} USD
         and the total amount of damages was {addDamages()} USD</p>;
    } else {
      return <p>The total number of disaters typed {type} across 
        the globe in {year} was {typeCount}.</p>;
    }
  } else {
    return<p>Select a disaster type and year!</p>;
  }
}

export default DisplayInfoType;