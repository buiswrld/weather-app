import unittest
from app import app

class TestLocationEndpoints(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.location = 'Los Angeles'
        cls.lat = '34'
        cls.lon = '-118'
        cls.coords_endpoint = f'/api/coords?location={cls.location}'
        cls.location_endpoint = f'/api/location?lat={cls.lat}&lon={cls.lon}'

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_get_coords(self):
        response = self.app.get(self.coords_endpoint)
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        print("Coordinates Data:", data)
        self.assertIsInstance(data, list)
        self.assertIn('lat', data[0])
        self.assertIn('lon', data[0])

    def test_get_location(self):
        response = self.app.get(self.location_endpoint)
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        print("Location Data:", data)
        self.assertIsInstance(data, list)
        self.assertIn('location', data[0])

if __name__ == '__main__':
    unittest.main()