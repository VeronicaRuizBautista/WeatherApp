import axios from 'axios';

const API_KEY = import.meta.env.VITE_EXPRESS_KEY;

// Función para obtener el clima actual
export const getCurrentWeather = async (location) => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&lang=es`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Función para obtener el pronóstico
export const getWeatherForecast = async (location, days = 1) => {
  try {
    const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&lang=es&days=${days}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
};
