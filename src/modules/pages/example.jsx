import React, { useEffect, useState, useRef } from 'react';
import styles from '../../css/example.module.css';
import bacground from '../../storage/img/background.png';
import air from '../../storage/img/air.png';
import wave from '../../storage/img/waves.png';
import sol from '../../storage/img/light_mode.png';
import rain from '../../storage/img/rainy.png';
import hour from '../../storage/img/history_toggle_off.png';
import calendar from '../../storage/img/calendar_month.png';
import { getCurrentWeather, getWeatherForecast } from '../../../server/weatherService.js';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function MyChart({ data }) {
  const dias = ['Mon', 'Tues', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun']
  const forecastData = data.forecastday.map(day => ({
    date: dias,
    temperatureDiff: day.day.avgtemp_c,
  }));

  return (
    <BarChart width={340} height={250} data={forecastData}>
      <XAxis dataKey="date" />
      <YAxis label="" />
      <Tooltip />
      <Legend />
      <Bar dataKey="temperatureDiff" fill="#8884d8" />
    </BarChart>
  );
}

export default function Example() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(false);
  const [location, setLocationInput] = useState('Floridablanca');

  const forecastDays = 1;  // Días de pronóstico

  // Función para obtener los datos del clima y pronóstico
  const fetchWeatherData = async () => {
    try {
      const weatherData = await getCurrentWeather(location);
      const forecastData = await getWeatherForecast(location, forecastDays);
      setWeather(weatherData);
      setForecast(forecastData.forecast);
    } catch (error) {
        console.log("no hay data disponible", error)
        setError(true);
    }
  };

    const handleInputChange = (event) => {
        setLocationInput(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log("igid")
            fetchWeatherData()
        }
    };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (error) {
    return <div className={styles.error}>Error loading weather data.</div>;
  }

  if (!weather || !forecast) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.weatherWidget}>
        <div className={styles.boximg}>
            <img src={bacground} alt="" />
        </div>
      <div className={styles.location}>
        <input
        type="text"
        placeholder={`${weather.location.name}, ${weather.location.country}`}
        value={location}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
        <div className={styles.icon}>
        <i className='bx bx-search-alt-2' style={{color: '#fdf7f7'}}  ></i>
        </div>
      </div>
      <div className={styles.temperature}>
        <h1>{weather.current.temp_c}</h1>
        <div className={styles.contain}>
            <img src={`http:${weather.current.condition.icon}`} alt="weather icon" />
            <p>{weather.current.condition.text}</p>
        </div>
      </div>
      <div className={styles.fecha}>
        <p>{weather.location.localtime}</p>
        <p>Day 3 <br /> Night -1</p>
      </div>
      <section className={styles.menu}>
        <button className={styles.seleccionado}>Today</button>
        <button>Tomorrow</button>
        <button>10 days</button>
      </section>
      <div className={styles.additionalInfo}>
        <div className={styles.box1}>
            <div className={styles.wind}>
              <div className={styles.boxImg}>
                <img src={air} alt="" />
              </div>
             <p>Wind: <br />{weather.current.wind_kph} km/h</p>
            </div>
            <div className={styles.presure}>
              <div className={styles.boxImg}>
                <img src={wave} alt="" />
              </div>
              <p>Pressure: <br />{weather.current.pressure_mb} hpa</p>
            </div>
        </div>
        <div className={styles.box2}>
            <div className={styles.rain}>
              <div className={styles.boxImg}>
                <img src={rain} alt="" />
              </div>
              <p>Rain chance: <br />{weather.current.humidity}%</p>
            </div>
            <div className={styles.uv}>
              <div className={styles.boxImg}>
                <img src={sol} alt="" />
              </div>
              <p>UV Index: <br />{weather.current.uv}</p>
            </div>
        </div>
      </div>
      <div className={styles.forecast}>
        <div className={styles.title}>
          <div className={styles.boxImg}>
            <img src={hour} alt="" />
          </div>
          <h3>Hourly forecast</h3>
        </div>
        <div className={styles.container}>
          {forecast.forecastday[0].hour.map((hour) => (
            <div key={hour.time_epoch} className={styles.hour}>
              <p>{hour.time.split(' ')[1]}</p>
              <img src={`http:${hour.condition.icon}`} alt="weather icon" />
              <p>{hour.temp_c}°C</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.forecastDay}>
        <div className={styles.title}>
            <div className={styles.boxImg}>
              <img src={calendar} alt="" />
            </div>
            <h3>Day forecast</h3>
          </div>
          <MyChart data={forecast}></MyChart>
      </div>
      <div className={styles.chanceOfRain}>
        <div className={styles.title}>
            <div className={styles.boxImg}>
              <img src={calendar} alt="" />
            </div>
            <h3>Chance of rain</h3>
          </div>
      </div>
    </div>
  );
}
