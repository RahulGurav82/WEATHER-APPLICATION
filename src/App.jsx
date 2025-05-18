import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBox from "./components/SearchBox";
import Forecast from "./components/Forecast";
import LoadingSpinner from "./components/LoadingSpinner";
import WeatherEffects from "./components/WeatherEffects"; // Import the new component

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState("metric"); // metric or imperial
  
  const API_KEY = import.meta.env.VITE_WHEATHERAPI_KEY;
  
  // Get user's location on initial load
  useEffect(() => {
    if (navigator.geolocation) {
      console.log(navigator)
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          console.error(err);
          setError("Location access denied. Please search for a city.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);
  
  const toggleUnits = () => {
    setLoading(true);  // Show loading state while updating
    const newUnits = units === "metric" ? "imperial" : "metric";
    setUnits(newUnits);
    
    // Refetch data with new units if we have weather data
    if (weather) {
      const city = weather.name;
      // Pass the newUnits value directly to ensure it uses the updated units
      fetchWeatherByCity(city, newUnits);
    }
  };

  // Update the fetchWeatherByCity function to accept units parameter
  const fetchWeatherByCity = async (city, unitsToUse = units) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch current weather with the provided units
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unitsToUse}&appid=${API_KEY}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error(weatherResponse.status === 404 ? "City not found" : "Weather data not available");
      }
      
      const weatherData = await weatherResponse.json();
      
      // Use coordinates from the weather response to get the forecast
      const { lat, lon } = weatherData.coord;
      
      // Fetch 5-day forecast with the provided units
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unitsToUse}&appid=${API_KEY}`
      );
      
      if (!forecastResponse.ok) {
        throw new Error("Forecast data not available");
      }
      
      const forecastData = await forecastResponse.json();
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError("Failed to fetch weather data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon, unitsToUse = units) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unitsToUse}&appid=${API_KEY}`
      );
      
      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unitsToUse}&appid=${API_KEY}`
      );
      
      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error("Weather data not available");
      }
      
      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError("Failed to fetch weather data: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-700 p-4 md:p-8">
      {/* Add the WeatherEffects component */}
      {weather && <WeatherEffects weather={weather} />}
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          WeatherNow
        </h1>
        
        <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-lg p-4 md:p-6 mb-6">
          <SearchBox onSearch={fetchWeatherByCity} />
          
          <div className="flex items-center justify-end mt-4">
            <span className="text-white mr-2">Units:</span>
            <button
              onClick={toggleUnits}
              className="bg-white/30 hover:bg-white/40 text-white font-medium py-1 px-3 rounded-full transition-colors cursor-pointer"
            >
              {units === "metric" ? "°C" : "°F"}
            </button>
          </div>
        </div>
        
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-red-500/80 text-white p-4 rounded-lg text-center">
            {error}
          </div>
        ) : weather ? (
          <div className="space-y-6">
            <WeatherCard weather={weather} units={units} />
            {forecast && <Forecast forecast={forecast} units={units} />}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;