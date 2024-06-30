import React, { useEffect, useState } from 'react'
import Buttons from './components/Buttons'
import './app.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Input from './components/Input';
import TimeLocation from './components/TimeLocation';
import TempDetails from './components/TempDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherservice';

const App = () => {

  const [query, setquery] = useState({q: 'tokyo'});
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  const getweather = async()=>{
   await getFormattedWeatherData({...query, units}).then((data) =>{
    setWeather(data);
   });
    // console.log(data);
  }

  useEffect(()=>{
    getweather();
  }, [query, units])



  return (
    <div className='main-component'>
      <Buttons setquery={setquery} />
      <Input setquery={setquery} setUnits={setUnits} />

      {
        weather && (
          <>
          <TimeLocation weather={weather} />

<TempDetails weather={weather}/>

<Forecast title='3 hour step forecast' data={weather.hourly} />

<Forecast title='Daily forecast' data={weather.daily}/>
          </>
          )
      }

      
    </div>
  )
}

export default App