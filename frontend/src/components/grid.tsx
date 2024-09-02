import React from 'react';
import {SimpleGrid, Box} from '@chakra-ui/react';
import FutureForecast from './future/future-forecast';
import CurrentForecast from './current/current-forecast';
import GeminiContainer from './gemini/gemini-container';

/**
 * Grid component that displays future forecast, current forecast, and the Gemini container.
 * 
 * @returns A React component that renders a grid with three boxes containing different forecast components; the main display of the program
 */
const Grid = () => {
    /**
     * Styles for the Box components.
     */
    const boxStyles = {
        bg: '#EFF2FF',
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