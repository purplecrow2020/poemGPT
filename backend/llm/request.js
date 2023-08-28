/**
 * Calls the OpenAI API to generate text completions using a chat-like interface.
 * @param {object} openAIClient - An instance of the OpenAI client.
 * @param {object} reqParams - Request parameters for generating completions.
 * @param {boolean} reqParams.stream - Indicates whether to use streaming mode.
 * @param {string} reqParams.prompt - The user's input prompt for the chat.
 * @param {string} reqParams.model - The model to use for generating completions (default: 'gpt-3.5-turbo').
 * @returns {Promise<object> | null} - A promise that resolves to the OpenAI API response.
 */
async function callOpenAI(openAIClient, reqParams) {
    try {
        const {
            stream = false,
            prompt,
            model = 'gpt-3.5-turbo',
        } = reqParams;
        const payload = {
            model,
            messages: [{ role: 'user', content: prompt }],
        };

        if (stream) {
            payload.stream = true;
        }
        return openAIClient.chat.completions.create(payload);
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    callOpenAI,
}