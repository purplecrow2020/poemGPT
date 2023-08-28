const socketEventsENUM = {
    CONNECT: 'connect', // event for connection [ RECIEVE ],
    DISCONNECT: 'disconnect', // event for disconnection [ RECIEVE ],
    GENERATE_POEM: 'GENERATE_POEM', // event to generate poem [ SEND ],
    POEM_GENERATED: 'POEM_GENERATED', // event for generated poem [ RECIEVE ],
    ANALYSE_POEM_EMOTIONS: 'ANALYSE_POEM_EMOTIONS', // event to analyse poem emotions [ SEND ],
    POEM_EMOTION_ANALYSIS: 'POEM_EMOTIONS_ANALYSED', // event for poem emotions analysis [ RECIEVE ],
};

const llmTasksENUM = {
    GENERATE_POEM: 'generate-poem',
    ANALYSE_POEM_EMOTIONS: 'analyse-poem-emotions',
}


module.exports = {
    socketEventsENUM,
    llmTasksENUM,
}
