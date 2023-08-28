const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const OpenAI = require("openai");
const config = require('./config');
const {
    socketEventsENUM,
    llmTasksENUM,
} = require('./constants');
const LLMRequestHandler = require('./llm/request');
const LLMRequestPrompter = require('./llm/prompter');
const LLMResponseHandler = require('./llm/response');

// Configure Socket Protocol over Http Server
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

// Configuring OpenAI
const openai = new OpenAI({
    apiKey: config.openApiKey,
});


// SOCKET EVENTS ( LISTENERS , EMITTERS )
io.on(socketEventsENUM.CONNECT, (socket) => {
    console.info('A USER is  Connected');

    socket.on(socketEventsENUM.GENERATE_POEM, async (msg) => {
        const {
            poemThought,
        } = msg;
        const response = await LLMRequestHandler.callOpenAI(openai, {
            stream: true,
            prompt: LLMRequestPrompter.generatePrompt({
                task: llmTasksENUM.GENERATE_POEM,
                context: poemThought,
            }),
        });

        for await (const part of response) {
            if (LLMResponseHandler.isResponseMessageIndicatingCompletion(part)) {
                socket.emit(socketEventsENUM.POEM_GENERATED, null);
                break;
            }

            if (LLMResponseHandler.isResponseMessageContentInvalid(part)) {
                socket.emit(socketEventsENUM.POEM_GENERATED, '');
                continue;
            }

            const formattedMessageContent = formatTextResponseToRenderHTML(part);
            socket.emit(socketEventsENUM.POEM_GENERATED, formattedMessageContent);
        }
    });

    socket.on(socketEventsENUM.ANALYSE_POEM_EMOTIONS, async (msg) => {
        const {
            poem,
        } = msg;

        const response = await LLMRequestHandler.callOpenAI(openai, {
            prompt: LLMRequestPrompter.generatePrompt({
                task: llmTasksENUM.ANALYSE_POEM_EMOTIONS,
                context: poem,
            }),
        });

        const emotionWisePercentageJSON = LLMResponseHandler.transformEmotionalAnalysisResponseToJSON(response.choices[0]?.message.content);
        socket.emit(socketEventsENUM.POEM_EMOTION_ANALYSIS, emotionWisePercentageJSON);
    });
});


io.on(socketEventsENUM.DISCONNECT, () => {
    console.info('A USER is  Disconnected');
});


module.exports = server;