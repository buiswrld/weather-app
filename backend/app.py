from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import requests

app = Flask(__name__)
CORS(app)

def get_weather_data(lat: str, lon: str) -> dict:
    response = requests.get(f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&hourly=temperature_2m")
    data = response.json()
    hourly_celsius = data['hourly']['temperature_2m']
    hourly_fahrenheit = [round(temp * 9/5 + 32) for temp in hourly_celsius]
    data['hourly']['temperature_2m'] = hourly_fahrenheit
    return data

@app.route('/api/weather', methods=['GET'])
def get_weather() -> dict:
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    data = get_weather_data(lat, lon)
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)