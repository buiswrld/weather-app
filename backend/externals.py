import requests

def get_weather_data(lat: str, lon: str) -> dict:
    response = requests.get(f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&hourly=temperature_2m")
    data = response.json()
    hourly_celsius = data['hourly']['temperature_2m']
    hourly_fahrenheit = [round(temp * 9/5 + 32) for temp in hourly_celsius]
    data['hourly']['temperature_2m'] = hourly_fahrenheit
    return data