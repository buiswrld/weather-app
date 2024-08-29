import React, { useState } from 'react';
import { fetchWeather } from '../api/weather-service'; // Ensure this service fetches data from Open-Meteo

const Weather: React.FC = () => {
    const [lat, setLat] = useState<string>('');
    const [lon, setLon] = useState<string>('');
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Weather App</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="Enter latitude"
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    value={lon}
                    onChange={(e) => setLon(e.target.value)}
                    placeholder="Enter longitude"
                    className="border p-2"
                />
                <button
                    onClick={handleFetchWeather}
                    className="bg-blue-500 text-white p-2 ml-2"
                >
                    Get Weather
                </button>
            </div>
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