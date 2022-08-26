import express from 'express';
import http from 'http';
import io from 'socket.io';
import moment from "moment";
import { handleCommand, isValidCommand, isUsernameUnique } from "./commands.mjs";

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

    // Handle chat messages
    socket.on('chat message', (msg) => {
        // Calculate message timestamp
        msg.timestamp = moment().unix();
        chatHistory.push(msg);
        allSockets.emit('chat message', msg);
        console.log('msg: ' + JSON.stringify(msg));
    });

    // Handle commands
    socket.on('chat command', (cmd) => {
        const serverResponse = {
            user: serverUser,
            text: "Successfully handled command.",
            timestamp: moment().unix(),
        };

        // Validate and handle the command
        try {
            isValidCommand(cmd, onlineUsers);
            handleCommand(cmd, user, onlineUsers);
            allSockets.emit('online users', onlineUsers);
            socket.emit('user', user);
        } catch (err) {
            serverResponse.text = `Error handling command: ${err}`;
        } finally {
            socket.emit('chat command', serverResponse);
        }
        console.log('cmd: ' + cmd);
    });

    // Handle disconnects
    socket.on('disconnect', () => {
        // Remove the user from the online users list
        const disconnectedUserIndex = onlineUsers.indexOf(user);
        if (disconnectedUserIndex > -1) {
            onlineUsers.splice(disconnectedUserIndex, 1);
        } else {
            console.log('user not found: ' + JSON.stringify(user));
        }

        // Tell all clients to update their online user list
        allSockets.emit('online users', onlineUsers);
        console.log('user disconnected: ' + JSON.stringify(user));
    });
});

server.listen(3001, () => {
    console.log('listening on http://localhost:3001/');
});
