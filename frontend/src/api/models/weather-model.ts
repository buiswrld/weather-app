export interface CurrentWeatherData {
    temperature_2m: number;
    apparent_temperature: number;
    is_day: number;
}

export interface HourlyWeatherData {
    date: string;
    time: string;
    temperature_2m: number;
    precipitation_probability: number;
    precipitation: number;
}

export interface DailyWeatherData {
    date: string;
    temperature_2m_max: number;
    temperature_2m_min: number;
    sunrise: string;
    sunset: string;
    uv_index_max: number;
}