import requests
import os
from dotenv import load_dotenv
from opencage.geocoder import OpenCageGeocode

load_dotenv()
OPENCAGE_API_KEY = os.getenv("OPENCAGE_API_KEY")

def get_weather_data(lat: str, lon: str) -> dict:
    response = requests.get(f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&hourly=temperature_2m")
    data = response.json()
    hourly_celsius = data['hourly']['temperature_2m']
    hourly_fahrenheit = [round(temp * 9/5 + 32) for temp in hourly_celsius]
    data['hourly']['temperature_2m'] = hourly_fahrenheit
    return data

def get_location_data(location: str) -> dict:
    geocoder = OpenCageGeocode(OPENCAGE_API_KEY)
    results = geocoder.geocode(location)
    return results[0]['geometry']