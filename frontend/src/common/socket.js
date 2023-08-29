import socketIOClient from 'socket.io-client';

const socketEndpoint = "http://localhost:5000";

export default socketIOClient(socketEndpoint, {
    query: '',
});

export const socketEvents = {
    GENERATE_POEM: 'GENERATE_POEM', // event to generate poem [ SEND ],
    POEM_GENERATED: 'POEM_GENERATED', // event for generated poem [ RECIEVE ],
    ANALYSE_POEM_EMOTIONS: 'ANALYSE_POEM_EMOTIONS', // event to analyse poem emotions [ SEND ],
    POEM_EMOTION_ANALYSIS: 'POEM_EMOTIONS_ANALYSED', // event for poem emotions analysis [ RECIEVE ],
};
