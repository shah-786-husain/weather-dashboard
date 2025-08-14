import React from "react";

function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>
      <p> Temp: {weather.main.temp}°C</p>
      <p> Humidity: {weather.main.humidity}%</p>
      <p> Wind: {weather.wind.speed} m/s</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>{weather.weather[0].description}</p>
    </div>
  );
}

export default WeatherCard;
