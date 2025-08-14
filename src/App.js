import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Favorites from "./components/Favorites";
import "./App.css";

const API_KEY = process.env.REACT_APP_OPENWEATHER_KEY; //  Weather API key

function App() {
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
        setCity(cityName);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const addFavorite = (cityName) => {
    if (!favorites.includes(cityName)) {
      const updated = [...favorites, cityName];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  return (
    <div className="app-container">
      <h1>🌤 Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeather} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && (
        <>
          <WeatherCard weather={weather} />
          <button onClick={() => addFavorite(city)}>Add to Favorites</button>
        </>
      )}
      <Favorites favorites={favorites} onSelect={fetchWeather} />
    </div>
  );
}

export default App;
