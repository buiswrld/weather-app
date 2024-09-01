export const fetchGeminiResponse = async (query: string): Promise<string> => {
    try {
        const response = await fetch(`http://localhost:5000/api/gemini?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch Gemini response');
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error in fetchGeminiResponse:', error);
        throw error;
    }
};