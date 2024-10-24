import React, { useEffect, useState, useRef } from 'react';
import styles from '../../css/example.module.css';
import bacground from '../../storage/img/background.png';
import air from '../../storage/img/air.png';
import wave from '../../storage/img/waves.png';
import sol from '../../storage/img/light_mode.png';
import rain from '../../storage/img/rainy.png';
import hour from '../../storage/img/history_toggle_off.png';
import calendar from '../../storage/img/calendar_month.png';
import sunset from '../../storage/img/bounding_box.png';
import sunrise from '../../storage/img/nights_stay.png';
import { getCurrentWeather, getWeatherForecast } from '../../../server/weatherService.js';
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const RainChart = ({ apiData }) => {
  const rainData = apiData.forecastday[0].hour.map((hour) => ({
    time: new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', hour12: true }),
    chanceOfRain: hour.chance_of_rain,
  }));

  return (
    <div style={{ backgroundColor: '#f5f5ff', padding: '1rem', borderRadius: '10px' }}>
      <ResponsiveContainer width="90%" height={800}>
      <BarChart
          data={rainData}
          layout="vertical"  
          barCategoryGap="15%"
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="time" width={80} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar
            dataKey="chanceOfRain"
            fill="#8A20D5"
            radius={[10, 10, 0, 0]}
            background={{ fill: '#e0dff9' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};



function MyChart({ data }) {
  const dias = ['Mon', 'Tues', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun']
  const forecastData = data.forecastday.map(day => ({
    date: dias,
    temperatureDiff: day.day.avgtemp_c,
  }));

  return (
    <BarChart width={340} height={200} data={forecastData}>
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
  const [astro, setSunrise] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const forecastDays = 1;  // Días de pronóstico

  // Función para obtener los datos del clima y pronóstico
  const fetchWeatherData = async () => {
    try {
      const weatherData = await getCurrentWeather(location);
      const forecastData = await getWeatherForecast(location, forecastDays);
      setSunrise(forecastData.forecast.astro)
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
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.1) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  if (error) {
    return <div className={styles.error}>Error loading weather data.</div>;
  }

  if (!weather || !forecast) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.weatherWidget}>
      <div id='img' className={styles.boximg} style={{ display: isScrolled ? 'none' : 'block' }}>
        <img src={bacground} alt="" />
      </div>
      <section id='caja' className={`${isScrolled ? styles.caja : ''}`}>
        <div className={styles.location}>
          <input
            type="text"
            placeholder={`${weather.location.name}, ${weather.location.country}`}
            value={location}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <div className={styles.icon}>
            <i id='lupa' className='bx bx-search-alt-2' style={{ color: isScrolled ? 'black' : '#fdf7f7' }}></i>
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
        </section>
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
      <div className={styles.barra}>
          {forecast && <RainChart apiData={forecast} />}
        </div>
      </div> 
      <footer className={styles.footer}>
        <div className={styles.sunrise}>
          <div className={styles.boxImg}>
            <img src={sunrise} alt="" />
          </div>
          <div className={styles.box}>
            <p>Sunrise</p>
            <p>{astro?.sunrise || '05:39 AM'}</p>
          </div>
        </div>
        <div className={styles.sunrise}>
          <div className={styles.boxImg}>
            <img src={sunset} alt="" />
          </div>
          <div className={styles.box}>
            <p>Sunrise</p>
            <p>{astro?.sunset || '05:35 PM'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
