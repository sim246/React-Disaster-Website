import logo from './logo.svg';
import './App.css';
import DisplayApi from  './components/DisplayApi.js';
import Dashboard from './components/Dashboard.js';

function App() {
  return (
    <div className="app">
      {/* Pass in setSelectedCountry, setSelectedDisaster, setSelectedYear once defined*/}
      <Dashboard></Dashboard>
      
    </div>
  );
}

export default App;
