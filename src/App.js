import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import WeatherIcon from './WeatherIcon';



function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = '55f305f820344c02960104809241601'; 

  useEffect(() => {

    getWeather();
  }, []); 

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError('City not found. Please enter a valid city name.');
    }
  };

  return (
  
  
 <div className={`App ${weatherData ? 'weather-active' : ''}`}>
        
      <header>
        <h1>Weather App</h1>
      </header>
      <section className="search-section">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </section>
      {weatherData && (
        <section className="weather-section">
          <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
          <WeatherIcon icon={weatherData.current.condition.icon} />
          <p>{weatherData.current.condition.text}</p>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
        </section>
      )}
      {weatherData && (
        <section className="forecast-section">
          <h2>5-Day Forecast</h2>
          <div className="forecast-container">
            {weatherData.forecast.forecastday.map((day) => (
              <div key={day.date} className="forecast-day">
                <p>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <WeatherIcon icon={day.day.condition.icon} />
                <p>{day.day.avgtemp_c}°C</p>
                <p>{day.day.condition.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {error && <p className="error">{error}</p>}
      
    </div>
   

  );
}

export default App;
