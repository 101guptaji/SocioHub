import http from 'http';
import app from './app.js';
import { connectDB } from "./db/config.js";
import {Server as SocketIOServer} from 'socket.io';

// Create HTTP server
const server = http.createServer(app);

const io = new SocketIOServer(server, {
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket)=>{
    console.log('New client connected: ', socket.id);

    const userId = socket.handshake.query.userId;
    console.log("User connected: ", userId);

    socket.join(userId); // Join a room identified by userId

    socket.on('disconnect', ()=>{
        console.log('Client disconnected: ', socket.id);
    });
})

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
    server.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
});