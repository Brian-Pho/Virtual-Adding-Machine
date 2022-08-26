import express from 'express';
import http from 'http';
import io from 'socket.io';
import moment from "moment";

const index = express();
const server = http.createServer(index);
const allSockets = io(server);

index.get('/', (req, res) => {
    res.send("<p>Server Page. This page isn't used.</p>");
});

const journalHistory = [];

// On connection of a new client
allSockets.on('connection', (socket) => {
    // Handle client initial connection
    socket.on('initial connection', () => {
        // Send the initial data dump of journal history
        socket.emit('journal history', journalHistory);
        console.log('user connected');
    });

    // Add journal entry
    socket.on('journal entry', (msg) => {
        journalHistory.push(msg);
        console.log('new entry: ' + JSON.stringify(msg));
    });

    // Clear journal history
    socket.on('journal history clear', () => {
        journalHistory.length = 0;
    });

    // Handle disconnects
    socket.on('disconnect', () => {});
});

server.listen(3001, () => {
    console.log('listening on http://localhost:3001/');
});
