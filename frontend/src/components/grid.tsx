import React from 'react';
import {SimpleGrid, Box} from '@chakra-ui/react';
import FutureForecast from './future-forecast';
import CurrentForecast from './current-forecast';


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
            <Box {...boxStyles}></Box>
        </SimpleGrid>
    )
}

export default Grid;