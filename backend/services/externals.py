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

# Initialize Open-Meteo API: Setup the Open-Meteo API client with cache and retry on error
METEO_URL = 'https://api.open-meteo.com/v1/forecast'
cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)


# Open-Meteo API Parameters
PARAMS = {
    'latitude': None,
    'longitude': None,
    'current': ['temperature_2m', 'apparent_temperature', 'is_day'],
    'hourly': ['temperature_2m', 'precipitation_probability', 'precipitation', 'weathercode'],
    'daily': ['temperature_2m_max', 'temperature_2m_min', 'sunrise', 'sunset', 'uv_index_max'],
    'temperature_unit': 'fahrenheit',
    'timezone': 'auto'
}

def build_weather_request(lat: str, lon: str) -> dict:
    PARAMS['latitude'] = lat
    PARAMS['longitude'] = lon
    
    response = retry_session.get(METEO_URL, params=PARAMS)
    response.raise_for_status()  
    return response.json()

### Weather Data ###

def get_current_weather(lat: str, lon: str) -> list:
    response = build_weather_request(lat, lon)
    current = response['current']
    return [{key: current[key] for key in PARAMS['current']}]

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
    results = geocoder.geocode(location)
    if not results:
        return []
    coordinates = results[0]['geometry']
    return [{'lat': coordinates['lat'], 'lon': coordinates['lng']}]

def get_location_from_coords(lat: int, lon: int) -> list:
    results = geocoder.reverse_geocode(lat, lon)
    if not results:
        return [{"location": "Unknown Location"}]

    components = results[0]['components']
    city = components.get('city', '')
    state = components.get('state', '')
    country = components.get('country', '')

    if country == 'United States':
        if city:
            location = f"{city}, {state}, USA"
        else:
            location = f"{state}, USA"
    elif city:
        location = f"{city}, {country}"
    elif country:
        location = country
    else:
        location = "Unknown Location"

    return [{"location": location}]


