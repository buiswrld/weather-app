import React, { useEffect, useState } from 'react';
import { Box, Flex, Spacer, Heading } from '@chakra-ui/react';
import { getDateTime } from '../../utils/time';
import SelectLocation from './select-location';
import SelectUser from './select-user';
import Subheader from './subheader';
/**
* @returns A React component that renders the header with date, time, location selector, and user selector.
*/
const Header = () => {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

    /**
   * Updates the current date and time.
   */
  useEffect(() => {
    const updateDateTime = () => {
      const { date, time } = getDateTime(new Date(), true);
      setDate(date);
      setTime(time);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box>
      <Flex>
        <SelectLocation />
        <Spacer />
        <Box marginY="60px" textAlign="center">
          <Heading fontSize="80px" textAlign="center">{time}</Heading>
          <Subheader text={date} />
        </Box>
        <Spacer />
        <SelectUser />
      </Flex>
    </Box>
  );
};

export default Header;