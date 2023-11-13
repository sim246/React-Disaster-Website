import './App.css';
import DisplayApi from  './components/DisplayApi.js';
import Dashboard from './components/Dashboard.js';

function App() {
  return (
    <div className="app">
      {/* Pass in setSelectedCountry, setSelectedDisaster, setSelectedYear once defined*/}
      <Dashboard setSelectedCountry={()=>{}} setSelectedDisaster={()=>{}} setSelectedYear={()=>{}}>
      </Dashboard>
      
    </div>
  );
}

export default App;
