const { io } = require('socket.io-client');

const SERVER_URL = 'http://localhost:3000';

// Connect Node Beta
const nodeBeta = io(SERVER_URL);
nodeBeta.on('connect', () => {
    console.log('[NODE-BETA] Connected to Consensus Grid with ID:', nodeBeta.id);
});

nodeBeta.on('transactionCommitted', (data) => {
    console.log('[NODE-BETA] Received Transaction Commit Event:', data);
});

// Connect Node Gamma
const nodeGamma = io(SERVER_URL);
nodeGamma.on('connect', () => {
    console.log('[NODE-GAMMA] Connected to Consensus Grid with ID:', nodeGamma.id);
});

nodeGamma.on('transactionCommitted', (data) => {
    console.log('[NODE-GAMMA] Received Transaction Commit Event:', data);
});