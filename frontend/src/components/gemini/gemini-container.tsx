// frontend/src/components/gemini/gemini-container.tsx

import React, { useState } from 'react';
import { fetchGeminiResponse } from '../../api/gemini-service';

const GeminiContainer: React.FC = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const handleFetchResponse = async () => {
        try {
            const result = await fetchGeminiResponse(query);
            setResponse(result);
        } catch (error) {
            console.error('Error fetching Gemini response:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your query"
            />
            <button onClick={handleFetchResponse}>Get Response</button>
            {response && <div>{response}</div>}
        </div>
    );
};

export default GeminiContainer;