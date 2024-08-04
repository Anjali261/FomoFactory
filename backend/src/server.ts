import app from './app';
import WebSocket, { Server } from 'ws';
import mongoose from 'mongoose';


// const PORT = process.env.PORT || 4000;
// const wsPort = process.env.WS_PORT || 8080;
const PORT = Number(process.env.PORT) || 4000;
const wsPort = Number(process.env.WS_PORT) || 80;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// WebSocket Server
const wss = new Server({ port: wsPort });
wss.on('connection', (client: WebSocket) => {
    console.log('Client connected');
    client.on('close', () => console.log('Client disconnected'));
});

const notifyClients = (data: any) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`WebSocket server running on ws://localhost:${wsPort}`);

});
