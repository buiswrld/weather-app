import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import app

class TestWeatherEndpoints(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.lat = '25'
        cls.lon = '135'
        cls.start_date = 'Sunday, September 1, 2024 23:00:00'
        cls.end_date = 'Sunday, September 1, 2024 23:00:00'
        cls.daily_endpoint = f'/api/weather/daily?lat={cls.lat}&lon={cls.lon}&start_date={cls.start_date}&end_date={cls.end_date}'
        cls.hourly_endpoint = f'/api/weather/hourly?lat={cls.lat}&lon={cls.lon}&start_date={cls.start_date}&end_date={cls.end_date}'

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_get_daily_weather(self):
        response = self.app.get(self.daily_endpoint)
        if response.status_code != 200:
            print("Error:", response.get_json())
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        print("Daily Weather Data:", data)
        self.assertIsInstance(data, list)

    def test_get_hourly_weather(self):
        response = self.app.get(self.hourly_endpoint)
        if response.status_code != 200:
            print("Error:", response.get_json())
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        print("Hourly Weather Data:", data)
        self.assertIsInstance(data, list)

if __name__ == '__main__':
    unittest.main()