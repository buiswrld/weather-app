import React, { useState } from 'react';
import { Text, Box } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import GeminiResponse from './gemini-response';

const GeminiContainer: React.FC = () => {

    return (
        <Box p = {2}>
            <GeminiResponse />
        </Box>
    )
};

export default GeminiContainer;