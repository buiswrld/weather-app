import { Heading, Box } from '@chakra-ui/react'
import React from 'react'

interface HeaderProps {
    text: string;
}
/**
* @param text - The text to be displayed in the subheader.
* @returns A React component that renders a subheader with the provided text.
*/
const Subheader: React.FC<HeaderProps> = ({ text }) => {
    return (
        <Box padding="" textAlign="center">
            <Heading fontSize="20px" textAlign="center">{text}</Heading>
        </Box>
    )
}

export default Subheader;