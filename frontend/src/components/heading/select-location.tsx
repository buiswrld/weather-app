import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { fetchLocationCoords } from '../../api/location-service';
import { LocationContext } from '../../context/location-context';


/**
 * @returns A React component that renders an input field for location and a submit button.
 */
const SelectLocation = () => {
  const [location, setLocation] = useState<string>('');
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('LocationContext must be used within a LocationProvider');
  }
  const { setLocationData } = context;

  /**
   * Handles changes to the input field and updates the location state.
   * 
   * @param event - The change event from the input field.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };
  
  /**
   * Handles the submit action, fetches the coordinates for the entered location,
   * and updates the location data in the context.
   */
  const handleSubmit = async () => {
    if (!location) {
      console.log('Location is empty'); 
      return;
    }
  
    try {
      const data = await fetchLocationCoords(location);
      if (data.length > 0) {
        setLocationData(data[0]);
      } else {
      }
    } catch (err) {
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