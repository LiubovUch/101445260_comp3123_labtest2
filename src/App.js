import React, { useState } from 'react';
import Weather from './Weather';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [forecastData, setForecastData] = useState(null);

  const fetchForecast = async () => {
    const API_KEY = '6267e8c1208da6ec942c6ec22bd8133d';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.cod === '200') {
        // Successful response
        setForecastData(data);
      } else {
        // Handle error responses (e.g., "city not found")
        alert(data.message);
      }
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      alert('Failed to fetch forecast data. Please try again later.');
    }
  };

  return (
    <div className="App">
      <h1>5-Day Weather Forecast</h1>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Enter city name..." 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
        />
        <button onClick={fetchForecast}>Search</button>
      </div>
      {forecastData && <Weather data={forecastData} />}
    </div>
  );
}

export default App;
