const {
    llmTasksENUM,
} = require('../constants');

/**
 * Generates a prompt based on the given task and context.
 * @param {Object} options - An object containing task and context properties.
 * @param {string} options.task - The task to be performed.
 * @param {string} options.context - The context for generating the prompt.
 * @returns {string|null} - The generated prompt or null if the task is invalid.
 */
function generatePrompt({
    task,
    context,
}) {
    switch (task) {
        case llmTasksENUM.GENERATE_POEM:
            return getPromptToGeneratePoem(context);
        case llmTasksENUM.ANALYSE_POEM_EMOTIONS:
            return getPromptToAnalysePoemEmotions(context);
        default:
            console.error("Invalid task", task);
            return null;
    }
}

/**
 * Generates a prompt for poem generation based on the given context.
 * @param {string} context - The thought or theme for the poem.
 * @returns {string} The generated prompt for poem generation.
 */
function getPromptToGeneratePoem(context) {
    return `I want you to act as a poet and generate a poem based on the input in the paragraph below.
    
    Poem Thought: ${context}

    The response should just contain the poem and nothing else in paragraphs.`;
}


/**
 * Generates a prompt for analyzing emotions in a poem based on the given context.
 * @param {string} context - The poem text to be analyzed.
 * @returns {string} The generated prompt for poem emotion analysis.
 */
function getPromptToAnalysePoemEmotions(context) {
    return `I want you to act as a NLP practitioner and help me in the emotional analysis of the poem below.

    Poem:  ${context}   

    Just give me output of your analysis in the table format with emotion in one column and percentage in another ( all the percentages combined should sum to 100 ). 
    Emotions could be one of these joy, surprise, disgust, sadness, fear, anger.
    Please be concise in answer by just returning the emotional analysis table and nothing else`;
}



module.exports = {
    generatePrompt,
};