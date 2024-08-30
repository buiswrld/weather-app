import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { fetchLocationData } from '../api/location-service';
import { LocationContext } from '../context/LocationContext';

const SelectLocation = () => {
  const [location, setLocation] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('LocationContext must be used within a LocationProvider');
  }
  const { setLocationData } = context;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleSubmit = async () => {
    if (!location) {
      setError('Location cannot be empty');
      return;
    }

    try {
      const data = await fetchLocationData(location);
      setLocationData(data);
      setError(null);
      console.log('Location data:', data);
    } catch (err) {
      setError('Failed to fetch location data');
    }
  };

  return (
    <InputGroup size='md' width="280px" height="36px" variant="filled" marginX="60px" marginY="80px">
      <Input
        pr='4.5rem'
        placeholder='Enter location'
        backgroundColor="white"
        onChange={handleInputChange}
        _focus={{ backgroundColor: "white" }}
      />
      <InputRightElement width='5.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleSubmit} bg='#EFF2FF'>
          Submit
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SelectLocation;