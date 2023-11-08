
function DisplayInfo({disaster, gdp}) {

  if (disaster !== null && gdp !== null){
    return(
      <div className="disaster">
        <h3>Country Name: {disaster.country}</h3>
        <p>Year: {disaster.year}</p>
        <p>Subgroup: {disaster.subgroup}</p>
        <p>Type: {disaster.type}</p>
        <p>GDP: {gdp.gdp}</p>
        <p>GDP per Capita: {gdp.gdpPerCapita}</p>
        <p>Insured Damages: {disaster.insuredDamages}</p>
        <p>Damages: {disaster.damages}</p>
      </div>);
  } else {
    return<p>Select a year and country!</p>;
  }
}

export default DisplayInfo;