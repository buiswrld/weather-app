/**
 * A mapping of weather codes to their corresponding descriptions and emojis.
 * 
 * The keys are weather codes represented as numbers, and the values are strings
 * that describe the weather condition along with an appropriate emoji. The conditions are pulled from Open-Meteo documentation
 * Access by weatherCodeDescriptions[weathercode]
 * 
 */
export const weatherCodeDescriptions: { [key: number]: string } = {
    0: "☀️ Clear sky",
    1: "🌤️ Mainly clear",
    2: "⛅ Partly cloudy",
    3: "☁️ Overcast",
    45: "🌫️ Fog",
    48: "🌫️ Depositing rime fog",
    51: "🌧️ Drizzle: Light",
    53: "🌧️ Drizzle: Moderate",
    55: "🌧️ Drizzle: Dense intensity",
    56: "🌧️ Freezing Drizzle: Light",
    57: "🌧️ Freezing Drizzle: Dense intensity",
    61: "🌧️ Rain: Slight",
    63: "🌧️ Rain: Moderate",
    65: "🌧️ Rain: Heavy intensity",
    66: "🌧️ Freezing Rain: Light",
    67: "🌧️ Freezing Rain: Heavy intensity",
    71: "❄️ Snow fall: Slight",
    73: "❄️ Snow fall: Moderate",
    75: "❄️ Snow fall: Heavy intensity",
    77: "❄️ Snow grains",
    80: "🌦️ Rain showers: Slight",
    81: "🌦️ Rain showers: Moderate",
    82: "🌦️ Rain showers: Violent",
    85: "🌨️ Snow showers slight",
    86: "🌨️ Snow showers heavy",
    95: "⛈️ Thunderstorm: Slight or moderate",
    96: "⛈️ Thunderstorm: Slight hail",
    99: "⛈️ Thunderstorm: Heavy hail"
};