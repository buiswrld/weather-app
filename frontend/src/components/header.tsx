import { Heading, Box } from '@chakra-ui/react'
import Subheader from './subheader';
import React, { useEffect, useState } from 'react'

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

            now.toLocaleTimeString();
    };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box paddingY="60px" textAlign="center">
            <Heading fontSize="80px" textAlign="center" marginBottom="10px">{time}</Heading>
            <Subheader text={date} />
        </Box>
    )
}

export default Header;