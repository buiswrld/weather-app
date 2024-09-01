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

                const weatherData = {
                    current: currentWeather,
                    hourly: hourlyWeather,
                    daily: dailyWeather,
                };

                const weatherDataStr = JSON.stringify(weatherData);
                const prompt = `This is weather data.  Please provide a useful summary of the weather for an average user. This summary might include important times to know or clothing reccomendations, although not required. Be somewhat concise in your response, but be more particular about the weather at the earliest date provided. This place is located at the coordinates: (${lat}, ${lon}). Here is the data: ${weatherDataStr}`;

                const response = await fetchGeminiResponse(prompt);
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