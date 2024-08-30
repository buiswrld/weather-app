import React, { useEffect, useState } from 'react';
import { Box, Flex, Spacer, Heading } from '@chakra-ui/react';
import SelectLocation from './select-location';
import SelectUser from './select-user';
import Subheader from './subheader';

const Header = () => {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: undefined,
        hour12: true,
      };

      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      const now = new Date();
      setDate(now.toLocaleDateString('en-US', dateOptions));
      setTime(now.toLocaleTimeString('en-US', timeOptions));
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