/**
 * Fetches the Gemini response from the server based on the provided query.
 * 
 * This function sends a GET request to the server's Gemini API endpoint with the query parameter.
 * If the response is successful, it returns the response text. If the response is not successful,
 * it throws an error.
 * 
 * @param query - The query string to be sent to the Gemini API.
 * @returns A promise that resolves to the response text from the Gemini API.
 * @throws An error if the fetch request fails or the response is not ok.
 */
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