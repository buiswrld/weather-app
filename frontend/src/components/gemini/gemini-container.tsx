import { Box } from '@chakra-ui/react';
import GeminiResponse from './gemini-response';
import InfoButtons from './info';   

const GeminiContainer: React.FC = () => {

    return (
        <Box>
            <Box p = {2}>
                <GeminiResponse />
            </Box>
            <Box p = {4}>
                <InfoButtons />
            </Box>
        </Box>
    )
};

export default GeminiContainer;