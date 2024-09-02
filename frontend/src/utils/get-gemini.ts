import { useState, useEffect } from 'react';
import { fetchDailyWeather, fetchHourlyWeather, fetchCurrentWeather } from '../api/weather-service';
import { fetchGeminiResponse } from '../api/gemini-service';
import { getDateTime } from './time';

export const useGeminiResponse = (lat: string, lon: string) => {
    const [geminiResponse, setGeminiResponse] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getGeminiResponse = async () => {
            try {
                const dateStart = getDateTime(new Date(), false);
                const dateEnd = getDateTime(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), false);
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
                const prompt = `This is weather data.  
                Please provide a useful and concise summary of the weather for an average user. 
                Don't be too specific about numbers. 
                Focus on overall trends.
                Avoid using bullet points. 
                Here is the data: ${weatherDataStr}`;

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