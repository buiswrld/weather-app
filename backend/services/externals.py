import os
import json
import requests
from dotenv import load_dotenv
from opencage.geocoder import OpenCageGeocode
import requests_cache
from retry_requests import retry

load_dotenv()

# Initialize OpenCage API
OPENCAGE_API_KEY = os.getenv('OPENCAGE_API_KEY')
geocoder = OpenCageGeocode(OPENCAGE_API_KEY)

# Setup the Open-Meteo API client with cache and retry on error
cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)

# API URL
METEO_URL = 'https://api.open-meteo.com/v1/forecast'

# Define the PARAMS dictionary as a global constant
PARAMS = {
    'latitude': None,
    'longitude': None,
    'current': ['temperature_2m', 'apparent_temperature', 'is_day'],
    'hourly': ['temperature_2m', 'precipitation_probability', 'precipitation'],
    'daily': ['temperature_2m_max', 'temperature_2m_min', 'sunrise', 'sunset', 'uv_index_max'],
    'temperature_unit': 'fahrenheit',
    'timezone': 'auto'
}

def build_weather_request(lat: str, lon: str) -> dict:
    # Update latitude and longitude in the PARAMS dictionary
    PARAMS['latitude'] = lat
    PARAMS['longitude'] = lon
    
    response = retry_session.get(METEO_URL, params=PARAMS)
    response.raise_for_status()  # Raise an exception for HTTP errors
    return response.json()

### Weather Data ###

def get_current_weather(lat: str, lon: str) -> dict:
    response = build_weather_request(lat, lon)
    current = response['current']
    return {key: current[key] for key in PARAMS['current']}

def get_hourly_weather(lat: str, lon: str) -> list:
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
    response = build_weather_request(lat, lon)
    daily = response['daily']
    daily_data = []
    for i in range(len(daily['time'])):
        daily_data.append({
            'date': daily['time'][i],
            **{key: daily[key][i] for key in PARAMS['daily']}
        })
    return daily_data

### Location Data ###

def get_coords_from_location(location: str) -> dict:
    results = geocoder.geocode(location)
    coordinates = results[0]['geometry']
    return {'lat': coordinates['lat'], 'lng': coordinates['lng']}

def get_location_from_coords(lat: int, lon: int) -> str:
    results = geocoder.reverse_geocode(lat, lon)
    return results[0]['formatted']

### TESTING ###

if __name__ == '__main__':
    lat, lon = 34, -118
    print('Current Weather:')
    print(json.dumps(get_hourly_weather(lat, lon), indent=4))

