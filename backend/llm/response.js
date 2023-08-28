const _ = require('lodash');


/**
 * Checks whether a response message part indicates completion.
 * @param {object} responseMessagePart - A part of the response message from an OpenAI API response.
 * @returns {boolean} - Returns true if completion is indicated, otherwise false.
 */
function isResponseMessageIndicatingCompletion(responseMessagePart) {
    if (_.get(responseMessagePart, 'choices[0].finish_reason', '') === 'stop') {
        return true;
    }
    return false;
}

/**
 * Checks whether a response message part has invalid content.
 * @param {object} responseMessagePart - A part of the response message from an OpenAI API response.
 * @returns {boolean} - Returns true if content is invalid, otherwise false.
 */
function isResponseMessageContentInvalid(responseMessagePart) {
    if (!_.get(responseMessagePart, 'choices[0].delta.content', null)) {
        return true;
    }
    return false;
}


/**
 * Formats the content of a response message part to render as HTML.
 * @param {object} responseMessagePart - A part of the response message from an OpenAI API response.
 * @returns {string} - The formatted content as HTML.
 */
function formatTextResponseToRenderHTML(responseMessagePart) {
    const messageContent = _.get(responseMessagePart, 'choices[0].delta.content', '');
    return messageContent.replace(/\n/g, '<br>');
}


/**
 * Transforms a text-based emotional analysis response into a JSON object.
 * @param {string} openAiResponse - The emotional analysis response text.
 * @returns {object|null} - The transformed emotional analysis as a JSON object or null if an error occurs.
 */
function transformEmotionalAnalysisResponseToJSON(openAiResponse) {
    try {
        const tableRows = openAiResponse.split('\n');
        const emotionsMap = {};
        for (let i = 0; i < tableRows.length; i++) {
            if (i <= 1) {
                continue;
            }
            let percentage;
            let emotion;
            const tableRow = tableRows[i];
            if (tableRow.includes('|')) {
                const parts = tableRow.split('|');
                emotion = parts[0].trim();
                percentage = parseInt(parts[1].trim().replace('%', ''));
            } else {
                const parts = tableRow.split(/\s+/);
                emotion = parts[0];
                percentage = parseInt(parts[1].replace('%', ''));
            }
            emotionsMap[emotion] = percentage;
        }
        return emotionsMap;
    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = {
    isResponseMessageIndicatingCompletion,
    isResponseMessageContentInvalid,
    formatTextResponseToRenderHTML,
    transformEmotionalAnalysisResponseToJSON,
}