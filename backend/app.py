from flask import Flask, jsonify, request
from flask_cors import CORS
import logging
from services.externals import get_current_weather, get_hourly_weather, get_daily_weather, get_coords_from_location, get_location_from_coords, get_gemini_response
from utils.date_conversion import process_date_range_and_filter_data
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route('/api/gemini', methods=['GET'])
def get_gemini_response_route() -> str:
    """
    Get Gemini response

    Query Parameters:
    - query (str): Query text

    Returns:
    - str: Gemini response
    """
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "query parameter is required"}), 400
    response = get_gemini_response(query)
    return response

@app.route('/api/coords', methods=['GET'])
def get_coords() -> dict:
    """
    Get coordinates from a named location (for processing)

    Query Parameters:
    - location (str): Location name

    Returns:
    - dict: A dictionary containing latitude and longitude coordinates.
    """
    location = request.args.get('location')
    if not location:
        return jsonify({"error": "location parameter is required"}), 400
    data = get_coords_from_location(location)
    return jsonify(data)

@app.route('/api/location', methods=['GET'])
def get_location() -> dict:
    lat, lon = request.args.get('lat'), request.args.get('lon')
    data = get_location_from_coords(lat, lon)
    return jsonify(data)

@app.route('/api/weather/current', methods=['GET'])
def get_current_weather_route() -> list:
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

@app.route('/api/weather/hourly', methods=['GET'])
def get_hourly_weather_route() -> list:
    """
    Get hourly weather data (per hour for a 7 day period)

    Query Parameters:
    - lat (str): Latitude
    - lon (str): Longitude
    - start_date (str): Start date (yyyy-mm-dd)
    - end_date (str): End date (yyyy-mm-dd)

    Returns:
    - list: A list of dictionaries containing weather data for every hour.
    (dictionary keys: ['temperature_2m', 'precipitation_probability', 'precipitation'])
    """
    lat, lon = request.args.get('lat'), request.args.get('lon')
    start_date_str = request.args.get('start_date')
    end_date_str = request.args.get('end_date')
    
    if not start_date_str or not end_date_str:
        return jsonify({"error": "start_date and end_date parameters are required"}), 400
    
    location_data = get_location_from_coords(lat, lon)
    offset_sec = location_data[0].get('offset_sec', 0)
    
    hourly_data = get_hourly_weather(lat, lon)
    result = process_date_range_and_filter_data(hourly_data, start_date_str, end_date_str, offset_sec)
    
    if isinstance(result, str):
        return jsonify({"error": result}), 400
    
    return jsonify(result)

@app.route('/api/weather/daily', methods=['GET'])
def get_daily_weather_route() -> list:
    """
    Get daily weather data (per day for 7 day period), or in a specified range

    Query Parameters:
    - lat (str): Latitude
    - lon (str): Longitude
    - start_date (str): Start date (yyyy-mm-dd)
    - end_date (str): End date (yyyy-mm-dd)

    Returns:
    - list: A list of dictionaries containing weather data for every hour.
    (dictionary keys: ['temperature_2m', 'precipitation_probability', 'precipitation'])
    """
    lat, lon = request.args.get('lat'), request.args.get('lon')
    start_date_str = request.args.get('start_date')
    end_date_str = request.args.get('end_date')
    
    if not start_date_str or not end_date_str:
        return jsonify({"error": "start_date and end_date parameters are required"}), 400
    
    print(f"Received start_date_str: {start_date_str}, end_date_str: {end_date_str}")
    
    location_data = get_location_from_coords(lat, lon)
    offset_sec = location_data[0].get('offset_sec', 0)
    
    daily_data = get_daily_weather(lat, lon)
    result = process_date_range_and_filter_data(daily_data, start_date_str, end_date_str, offset_sec)
    
    if isinstance(result, str):
        return jsonify({"error": result}), 400
    
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)