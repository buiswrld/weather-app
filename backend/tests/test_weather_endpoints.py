import unittest
from app import app

class TestWeatherEndpoints(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.lat = '34'
        cls.lon = '-118'
        cls.start_date = '2024-08-31'
        cls.end_date = '2024-09-06'
        cls.daily_endpoint = f'/api/daily?lat={cls.lat}&lon={cls.lon}&start_date={cls.start_date}&end_date={cls.end_date}'
        cls.hourly_endpoint = f'/api/hourly?lat={cls.lat}&lon={cls.lon}&start_date={cls.start_date}&end_date={cls.end_date}'

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_get_daily_weather(self):
        response = self.app.get(self.daily_endpoint)
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        print("Daily Weather Data:", data)
        self.assertIsInstance(data, list)

    def test_get_hourly_weather(self):
        response = self.app.get(self.hourly_endpoint)
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        print("Hourly Weather Data:", data)
        self.assertIsInstance(data, list)

if __name__ == '__main__':
    unittest.main()