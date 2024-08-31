from flask import Flask, jsonify, request
from flask_cors import CORS
from backend.services.externals import get_current_weather, get_hourly_weather, get_daily_weather, get_coords_from_location, get_location_from_coords
from backend.utils.date_conversion import parse_date_range, filter_data_by_date_range
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route('/api/location', methods=['GET'])
def get_location() -> dict:
    location = request.args.get('location')
    data = get_location_data(location)
    return jsonify(data)

@app.route('/api/current', methods=['GET'])
def get_current_weather() -> list:
    """
    Get current weather data

    Query Parameters:
    - lat (str): Latitude
    - lon (str): Longitude

    Returns:
    - list: A list of dictionaries containing current weather data. The list will always contain exactly one dictionary.
    (dictionary keys: ['temperature_2m', 'apparent_temperature', 'is_day'])
    """
    lat, lon = request.args.get('lat'), request.args.get('lon')
    data = get_current_weather(lat, lon)
    return jsonify(data)

@app.route('/api/hourly', methods=['GET'])
def get_hourly_weather() -> list:
    """
    Get hourly weather data (per hour for a 7 day period)

    Query Parameters:
    - lat (str): Latitude
    - lon (str): Longitude

    Returns:
    - list: A list of dictionaries containing weather data for every hour.
    (dictionary keys: ['temperature_2m', 'precipitation_probability', 'precipitation'])
    """
    lat, lon = request.args.get('lat'), request.args.get('lon')
    data = get_hourly_weather(lat, lon)
    return jsonify(data)

@app.route('/api/daily/<day>', methods=['GET'])
def get_daily_weather_for_day(day: str) -> list:
    """
    Get daily weather data (per day for 7 day period), or in a specified range

    Query Parameters:
    - lat (str): Latitude
    - lon (str): Longitude
    - 

    Returns:
    - list: A list of dictionaries containing weather data for every hour.
    (dictionary keys: ['temperature_2m', 'precipitation_probability', 'precipitation'])
    """
    lat, lon = request.args.get('lat'), request.args.get('lon')
    start_date_str = request.args.get('start_date')
    end_date_str = request.args.get('end_date')
    
    if not start_date_str or not end_date_str:
        return jsonify({"error": "start_date and end_date parameters are required"}), 400
    
    try:
        start_date, end_date = parse_date_range(start_date_str, end_date_str)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    
    daily_data = get_daily_weather(lat, lon)
    filtered_data = filter_data_by_date_range(daily_data, start_date, end_date)
    
    return jsonify(filtered_data)



if __name__ == '__main__':
    app.run(debug=True)