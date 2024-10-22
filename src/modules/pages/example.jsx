import React, { useEffect, useState } from 'react';
import styles from '../../css/example.module.css';
import { getCurrentWeather, getWeatherForecast } from '../../../server/weatherService.js';

export default function Example() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(false);

  const location = 'Floridablanca';  // Localización
  const forecastDays = 1;  // Días de pronóstico

  // Función para obtener los datos del clima y pronóstico
  const fetchWeatherData = async () => {
    try {
      const weatherData = await getCurrentWeather(location);
      const forecastData = await getWeatherForecast(location, forecastDays);
      setWeather(weatherData);
      setForecast(forecastData.forecast);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (error) {
    return <div className={styles.error}>Error loading weather data.</div>;
  }

  if (!weather || !forecast) {
    return <div className={styles.loading}>Loading...</div>; // Mensaje mientras cargan los datos
  }

  return (
    <div className={styles.weatherWidget}>
      <div className={styles.location}>
        <h2>{weather.location.name}, {weather.location.country}</h2>
        <p>{weather.location.localtime}</p>
      </div>
      <div className={styles.temperature}>
        <h1>{weather.current.temp_c}°C</h1>
        <p>{weather.current.condition.text}</p>
      </div>
      <div className={styles.additionalInfo}>
        <p>Wind: {weather.current.wind_kph} km/h</p>
        <p>Pressure: {weather.current.pressure_mb} hpa</p>
        <p>UV Index: {weather.current.uv}</p>
      </div>
      <div className={styles.forecast}>
        <h3>Hourly forecast</h3>
        <div>
          {forecast.forecastday[0].hour.map((hour) => (
            <div key={hour.time_epoch} className={styles.hour}>
              <p>{hour.time.split(' ')[1]} - {hour.temp_c}°C</p>
              <img src={`http:${hour.condition.icon}`} alt="weather icon" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
