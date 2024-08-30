export interface WeatherData {
    hourly: {
        temperature_2m: number[];
        time: string[];
    }
    location: string;
}