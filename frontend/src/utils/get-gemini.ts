// frontend/src/hooks/useGeminiResponse.ts

import { useState, useEffect } from 'react';
import { fetchDailyWeather, fetchHourlyWeather, fetchCurrentWeather } from '../api/weather-service';
import { fetchGeminiResponse } from '../api/gemini-service';
import { useLocationFromContext } from '../utils/location-util';
import { getDateTime } from './time';

export const useGeminiResponse = () => {
    const { lat, lon } = useLocationFromContext();
    const [geminiResponse, setGeminiResponse] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getGeminiResponse = async () => {
            try {
                const dateStart = getDateTime(new Date());
                const dateEnd = getDateTime(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000));
                const rangeStart = dateStart.date + " " + dateStart.time;
                const rangeEnd = dateEnd.date + " " + dateEnd.time;
                const currentWeather = await fetchCurrentWeather(lat, lon);
                const hourlyWeather = await fetchHourlyWeather(lat, lon, rangeStart, rangeEnd);
                const dailyWeather = await fetchDailyWeather(lat, lon, rangeStart, rangeEnd); 

                // Combine weather data into a single object
                const weatherData = {
                    current: currentWeather,
                    hourly: hourlyWeather,
                    daily: dailyWeather,
                };

                // Convert weather data to a string format (e.g., JSON)
                const weatherDataStr = JSON.stringify(weatherData);

                // Send the weather data to the Gemini service
                const response = await fetchGeminiResponse(weatherDataStr);
                setGeminiResponse(response);
            } catch (error) {
                console.error('Error in getGeminiResponse:', error);
                setError('Failed to fetch Gemini response');
            }
        };

        if (lat && lon) {
            getGeminiResponse();
        }
    }, [lat, lon]);

    return { geminiResponse, error };
};