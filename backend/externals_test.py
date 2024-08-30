import unittest
import sys
import os
from unittest.mock import patch, MagicMock
from externals import get_location_data

class TestGetLocationData(unittest.TestCase):
    @patch('externals.OpenCageGeocode')
    def test_get_location_data(self, MockGeocode):
        # Arrange
        mock_instance = MockGeocode.return_value
        mock_instance.geocode.return_value = [{'geometry': {'lat': 51.509865, 'lng': -0.118092}}]
        
        # Act
        result = get_location_data('London')
        print(result)
        
        # Assert
        self.assertEqual(result, {'lat': 51.509865, 'lng': -0.118092})
        mock_instance.geocode.assert_called_once_with('London')

if __name__ == '__main__':
    unittest.main()