from flask import Flask, jsonify, request
from flask_cors import CORS
from externals import get_weather_data
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route('/api/weather', methods=['GET'])
def get_weather() -> dict:
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    data = get_weather_data(lat, lon)
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)