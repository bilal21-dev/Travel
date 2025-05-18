import { useEffect, useState } from "react";

const WeatherInfo = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "5585f54d291401022217385080c84aef";

  useEffect(() => {
    if (location) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
          if (data.cod === 200) {
            setWeather(data);
            setError(null);
          } else {
            setError("City not found!");
          }
          setLoading(false);
        })
        .catch(() => {
          setError("Error fetching weather data.");
          setLoading(false);
        });
    }
  }, [location]);

  return (
    <div>
      {loading ? (
        <p className="text-gray-500">Search to get Weather Details</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : weather ? (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{weather.name}, {weather.sys.country}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            className="mx-auto"
          />
          <p className="text-2xl font-bold text-blue-600">{weather.main.temp}°C</p>
          <p className="text-gray-600 dark:text-gray-400">{weather.weather[0].description}</p>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherInfo;
