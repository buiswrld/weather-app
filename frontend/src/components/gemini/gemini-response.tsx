import { Box, Text, Card } from '@chakra-ui/react';
import { useGeminiResponse } from '../../utils/get-gemini';
import myImage from '../../assets/Google-Gemini.jpg'
import { useEffect, useState } from 'react';
import { useLocationFromContext } from '../../utils/location-util';

const GeminiResponse: React.FC = () => {
    const { lat, lon } = useLocationFromContext();
    const { geminiResponse, error} = useGeminiResponse(lat , lon);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (geminiResponse || error) {
            setLoading(false);
        }
    }, [geminiResponse, error]);

    return (
        <Box>
            <Box p={2} display="flex" justifyContent="center" alignItems="center">
                <img src={myImage} alt="Gemini" style={{ width: '200px', height: '100px', borderRadius: '100x' }} />
            </Box>
            <Card p={4}>
                {loading ? (
                    <Text textAlign="center">Loading...</Text>
                ) : error ? (
                    <Text color="red.500">Error: {error}</Text>
                ) : (
                    <Text textAlign="left">{geminiResponse}</Text>
                )}
            </Card>
        </Box>
    );
};

export default GeminiResponse;