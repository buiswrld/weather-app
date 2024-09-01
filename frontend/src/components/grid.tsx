import React from 'react';
import {SimpleGrid, Box} from '@chakra-ui/react';
import FutureForecast from './future/future-forecast';
import CurrentForecast from './current/current-forecast';
import GeminiContainer from './gemini/gemini-container';

const Grid = () => {

    const boxStyles = {
        bg: '#EFF2FF',
        //height: '600px',
        height: "100%",
        rounded: 'lg'
    }
    return (
        <SimpleGrid minChildWidth='120px' spacing='40px' marginX = "60px">
            <Box {...boxStyles}>
                <FutureForecast />
            </Box>
            <Box {...boxStyles}>
                <CurrentForecast />
            </Box>
            <Box {...boxStyles}>
                <GeminiContainer />
            </Box>
        </SimpleGrid>
    )
}

export default Grid;