import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureDetails from './components/TemperatureDetails';
import Forecast from './components/Forecast';
import getFormatedWeatherData from "./services/weatherApiService";
import { useEffect, useState } from 'react';

function App() {

  const [query, setQuery] = useState({q: "bangalore"})
  const [units, setUnits] = useState("metric")
  const [weather, setWeather] = useState(null)


  useEffect(() => {
    const fetchWeather = async () => {
     await getFormatedWeatherData({...query, units})
     .then((data) => {
      setWeather(data)
     }) 
     }
   
     fetchWeather();
  }, [query, units])

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-500 to-orange-500 h-fit shadow-xl shadow-gray-500">
    <TopButtons setQuery={setQuery}/>
    <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

    {weather && (
      <div>
        <TimeAndLocation weather={weather}/>
        <TemperatureDetails weather={weather}/>
        <Forecast title="Hourly forecast" items={weather.hourly}/>
        <Forecast title="Daily forecast" items={weather.daily}/>
      </div>
    )}

   
    </div>
  );
}

export default App;
