import React, { useState } from 'react';
import { useGeminiResponse } from '../../utils/get-gemini';
import { Text, Box } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';

const GeminiContainer: React.FC = () => {
    const { geminiResponse, error} = useGeminiResponse();

    return (
        <Box>
            {error ? (
                <Text color="red.500">Error: {error}</Text>
            ) : (
                <ReactMarkdown>{geminiResponse}</ReactMarkdown>
            )}
        </Box>
    );
};

export default GeminiContainer;