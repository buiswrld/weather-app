import os
import json
import requests
import google.generativeai as genai
from vertexai.generative_models import GenerativeModel
from dotenv import load_dotenv
from opencage.geocoder import OpenCageGeocode
import requests_cache
from retry_requests import retry

load_dotenv()

# Initialize OpenCage API
OPENCAGE_API_KEY = os.getenv('OPENCAGE_API_KEY')
geocoder = OpenCageGeocode(OPENCAGE_API_KEY)

# Initialize Open-Meteo API: Setup the Open-Meteo API client with cache and retry on error
METEO_URL = 'https://api.open-meteo.com/v1/forecast'
cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)

## Initialize Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")


# Open-Meteo API Parameters
PARAMS = {
    'latitude': None,
    'longitude': None,
    'current': ['temperature_2m', 'apparent_temperature', 'is_day'],
    'hourly': ['temperature_2m', 'precipitation_probability', 'precipitation', 'weathercode'],
    'daily': ['temperature_2m_max', 'temperature_2m_min', 'sunrise', 'sunset', 'uv_index_max', 'weathercode', 'precipitation_probability_max'],
    'temperature_unit': 'fahrenheit',
    'timezone': 'auto'
}

def build_weather_request(lat: str, lon: str) -> dict:
    """
    Builds and sends a weather request to the weather API.

    Args:
    - lat (str): Latitude of the location.
    - lon (str): Longitude of the location.

    Returns:
    - dict: The response from the weather API.
    """
    PARAMS['latitude'] = lat
    PARAMS['longitude'] = lon
    
    response = retry_session.get(METEO_URL, params=PARAMS)
    response.raise_for_status()  
    return response.json()

### Weather Data ###

def get_current_weather(lat: str, lon: str) -> list:
    """
    Fetches the current weather data for the given latitude and longitude.

    Args:
    - lat (str): Latitude of the location.
    - lon (str): Longitude of the location.

    Returns:
    - list: A list containing a single dictionary list[0] of current weather data. ['temperature_2m', 'apparent_temperature', 'is_day']
    """
    response = build_weather_request(lat, lon)
    current = response['current']
    return [{key: current[key] for key in PARAMS['current']}]

def get_hourly_weather(lat: str, lon: str) -> list:
    """
    Fetches the hourly weather data for the given latitude and longitude.

    Args:
    - lat (str): Latitude of the location.
    - lon (str): Longitude of the location.

    Returns:
    - list: A list of dictionaries containing hourly weather data. ['temperature_2m', 'precipitation_probability', 'precipitation', 'weathercode']
    """
    response = build_weather_request(lat, lon)
    hourly = response['hourly']
    hourly_data = []
    for i in range(len(hourly['time'])):
        date_time = hourly['time'][i].split('T')
        hourly_data.append({
            'date': date_time[0],
            'time': date_time[1],
            **{key: hourly[key][i] for key in PARAMS['hourly']}
        })
    return hourly_data

def get_daily_weather(lat: str, lon: str) -> list:
    """
    Fetches the daily weather data for the given latitude and longitude.

    Args:
    - lat (str): Latitude of the location.
    - lon (str): Longitude of the location.

    Returns:
    - list: A list of dictionaries containing daily weather data. ['temperature_2m_max', 'temperature_2m_min', 'sunrise', 'sunset', 'uv_index_max', 'weathercode', 'precipitation_probability_max']
    """
    response = build_weather_request(lat, lon)
    daily = response['daily']
    daily_data = []
    for i in range(len(daily['time'])):
        day_data = {
            'date': daily['time'][i],
            **{key: daily[key][i] for key in PARAMS['daily']}
        }
        if 'sunrise' in day_data:
            day_data['sunrise'] = day_data['sunrise'].split('T')[1]
        if 'sunset' in day_data:
            day_data['sunset'] = day_data['sunset'].split('T')[1]
        daily_data.append(day_data)
    return daily_data

### Location Data ###

def get_coords_from_location(location: str) -> list:
    """
    Fetches the latitude and longitude coordinates for a given location name.

    Args:
    - location (str): The name of the location.

    Returns:
    - list: A list of a singular dictionary list[0] containing the latitude ('lat') and longitude ('lon') coordinates.
    """
    results = geocoder.geocode(location)
    if not results:
        return []
    coordinates = results[0]['geometry']
    return [{'lat': coordinates['lat'], 'lon': coordinates['lng']}]

def get_location_from_coords(lat: int, lon: int) -> list:
    """
    Fetches the location name based on the provided latitude and longitude coordinates.

    Args:
    - lat (str): Latitude of the location.
    - lon (str): Longitude of the location.

    Returns:
    - list: A list of a singular dictionary list[0] containing the location name ('location') and timezone offset from GMT+0 UTC ('timezone_offset').
    """
    results = geocoder.reverse_geocode(lat, lon)
    if not results:
        return [{"location": "Unknown Location"}]

    components = results[0]['components']
    city = components.get('city', '')
    state = components.get('state', '')
    country = components.get('country', '')
    timezone_offset = results[0].get('annotations', {}).get('timezone', {}).get('offset_sec', 0)

    if country == 'United States':
        if city and state:
            location = f"{city}, {state}, USA"
        elif state:
            location = f"{state}, USA"
        else:
            location = country
    elif city and country:
        location = f"{city}, {country}"
    elif country:
        location = country
    else:
        location = "Unknown Location"

    return [{"location": location, "timezone_offset": timezone_offset}]

### Gemini ###
def get_gemini_response(query: str) -> str:
    """
    Fetches a response from the Gemini service based on the provided query.

    Args:
    - query (str): The query string to be sent to the Gemini service.

    Returns:
    - str: The response text from the Gemini service.
    """
    response = model.generate_content(query)
    return response.text
    


