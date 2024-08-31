import requests
import os
from dotenv import load_dotenv
from opencage.geocoder import OpenCageGeocode

load_dotenv()
OPENCAGE_API_KEY = os.getenv("OPENCAGE_API_KEY")
geocoder = OpenCageGeocode(OPENCAGE_API_KEY)

def get_temperature_data(lat: str, lon: str) -> dict:
    response = requests.get(f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&hourly=temperature_2m")
    data = response.json()
    hourly_celsius = data['hourly']['temperature_2m']
    hourly_fahrenheit = [round(temp * 9/5 + 32) for temp in hourly_celsius]
    data['hourly']['temperature_2m'] = hourly_fahrenheit
    return data

def get_location_data(location: str) -> dict:
    results = geocoder.geocode(location)
    geometry = results[0]['geometry']
    place_name = results[0]['formatted']
    return {'lat': geometry['lat'], 'lng': geometry['lng'], 'place_name': place_name}