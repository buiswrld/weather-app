from flask import Flask, jsonify, request
from flask_cors import CORS
from backend.services.externals import get_current_weather, get_hourly_weather, get_daily_weather, get_coords_from_location, get_location_from_coords
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
    lat, lon = request.args.get('lat'), request.args.get('lon')
    data = get_current_weather(lat, lon)
    return jsonify(data)

@app.route('/api/hourly', methods=['GET'])
def get_hourly_weather() -> list:
    lat, lon = request.args.get('lat'), request.args.get('lon')
    data = get_hourly_weather(lat, lon)
    return jsonify(data)

@app.route('/api/daily', methods=['GET'])
def get_daily_weather() -> list:
    lat, lon = request.args.get('lat'), request.args.get('lon')
    data = get_daily_weather(lat, lon)
    return jsonify(data)



if __name__ == '__main__':
    app.run(debug=True)