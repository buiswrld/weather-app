import React, { useEffect, useState } from "react";
import Temperature from "./temperature";
import Location from "./location";
import TemperatureBound from "./temperature-bound";
import HourlyForecast from "./hourly-forecast";
import ExtraForecast from "./extra-forecast";
import { getCurrentWeather, getDailyWeather, getHourlyWeather } from "../../utils/get-weather";
import { useLocationFromContext, getLocationName } from "../../utils/location-util";
import { Box, Spinner, Alert, AlertIcon, Heading } from "@chakra-ui/react";
import { CurrentWeatherData, DailyWeatherData, HourlyWeatherData } from "../../api/models/weather-model";
import { weatherCodeDescriptions } from "../../utils/weathercodes";


/**
* @returns A React component that renders the current weather, daily weather, and hourly weather forecasts.
*/
const CurrentForecast = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [dailyWeather, setDailyWeather] = useState<DailyWeatherData[] | null>(null);
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeatherData[] | null>(null);
  const [location, setLocation] = useState<string>("");
  const { lat, lon } = useLocationFromContext();

  useEffect(() => {

    /**
     * Fetches the weather (currenty, hourly, and daily) data based on the provided latitude and longitude in the context. 
     */
    const fetchWeather = async () => {
      if (lat && lon) {
        setLoading(true);
        try {
          setCurrentWeather(await getCurrentWeather(lat, lon));
          setHourlyWeather(await getHourlyWeather(lat, lon));
          setDailyWeather(await getDailyWeather(lat, lon));
          setLocation(await getLocationName(lat, lon));
        } catch (error) {
          setError("Failed to fetch weather data");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchWeather();
  }, [lat, lon]);

  if (!lat || !lon) {
    return <Spinner />;
  }

  return (
    <Box className="container" mx="auto" p="4" position="relative">
      {loading && (
        <Box position="absolute" top="1rem" right="1rem">
          <Spinner size="lg" />
        </Box>
      )}
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      {!loading && currentWeather && hourlyWeather && dailyWeather ? (
        <Box>
          <Location location={location} />
          <Heading size="sm" textAlign="center" mb={4}>
          {weatherCodeDescriptions[dailyWeather[0].weathercode]}
          </Heading>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Temperature
              temperature={currentWeather.temperature_2m}
              is_day={currentWeather.is_day}
              apparent_temperature={currentWeather.apparent_temperature}
              temp_max={dailyWeather[0].temperature_2m_max}
              temp_min={dailyWeather[0].temperature_2m_min}
            />
            <TemperatureBound
              is_day={currentWeather.is_day}
              temp_max={dailyWeather[0].temperature_2m_max}
              temp_min={dailyWeather[0].temperature_2m_min}
            />
          </Box>
          <ExtraForecast
            uvIndex={dailyWeather[0].uv_index_max}
            apparentTemperature={currentWeather.apparent_temperature}
          />
          <Box></Box>

          <HourlyForecast
            data={hourlyWeather}
            sunrise={dailyWeather[0].sunrise}
            sunset={dailyWeather[0].sunset}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default CurrentForecast;
