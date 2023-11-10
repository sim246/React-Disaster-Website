
function DisplayInfo({disasters, gdp}) {
  const [insuredGDP, setInsuredGDP] = useState(0);
  const [damagesGDP, setDamagesGDP] = useState(0);

  if (disasters !== null && gdp !== null){
    
    const groupTypes = disasters.map((disaster) => {
      setInsuredGDP(insuredGDP + disaster.insuredDamages);
      setDamagesGDP(damagesGDP + disaster.damages);
      return <>
        <li>Subgroup: {disaster.subgroup}</li>
        <li>Type: {disaster.type}</li>
      </>;
    });

    return(
      <div className="disaster">
        <h3>Country Name: {disasters[0].country}</h3>
        <p>Year: {disasters[0].year}</p>
        {/* Total Number of Disasters: {} */}
        <ul>
          {groupTypes}
        </ul>
        <p>GDP: {gdp.gdp}</p>
        <p>GDP per Capita: {gdp.gdpPerCapita}</p>
        <p>Total Insured Damages: {insuredGDP}</p>
        <p>Total Damages: {damagesGDP}</p>
      </div>);
  } else {
    return<p>Select a year and country!</p>;
  }
}

export default DisplayInfo;