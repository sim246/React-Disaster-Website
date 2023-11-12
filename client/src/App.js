import './App.css';
import Map from './components/Map.js';

function App() {
  return (
    <div className="App">
      <h1>project</h1>
      {/* <DisplayApi /> */}
      <Map selectedCountry={'Canada'} />
    </div>
  );
}

export default App;
