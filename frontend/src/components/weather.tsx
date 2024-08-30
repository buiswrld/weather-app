import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../api/weather-service';
import '../styles/select-location.css';

interface WeatherProps {
  lat: string;
  lon: string;
}

const Weather: React.FC<WeatherProps> = ({ lat, lon }) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleFetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeather(lat, lon);
        setWeather(data);
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    handleFetchWeather();
  }, [lat, lon]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {weather && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Weather Forecast</h2>
          {weather.hourly.time.map((time: string, index: number) => (
            <div key={index} className="mb-2">
              <p>
                <strong>{time}:</strong> {weather.hourly.temperature_2m[index]}°F
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;