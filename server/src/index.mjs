import express from 'express';
import http from 'http';
import io from 'socket.io';
import moment from "moment";
import { handleCommand, isValidCommand, isUsernameUnique } from "./commands.mjs";

const index = express();
const server = http.createServer(index);
const allSockets = io(server);

index.get('/', (req, res) => {
    res.send("<p>Chat Server Page. This page isn't used for chatting.</p>");
});

// List of previous messages with the poster and timestamp
const chatHistory = [];
// List of online users
const onlineUsers = [];
// User counter used for unique usernames
let countUser = 0;
// Server user
const serverUser = {
    name: "Server",
    color: "000000",
};

// On connection of a new client
allSockets.on('connection', (socket) => {
    let user = undefined;

    // Handle user initialization
    socket.on('cookie user', (cookieUser) => {
        const cookieUsername = cookieUser.name;

        // If this is a new user or if the user doesn't have a unique username,
        // then autogenerate a user for them
       if (cookieUsername === 'Offline' || !isUsernameUnique(cookieUsername, onlineUsers)) {
           // Loop until a unique username is found. Is needed to handle the case when
           // another username is the same as the generated one
           do {
               user = {
                   name: `User${countUser}`,
                   color: `${Math.floor(Math.random() * 16777215).toString(16)}`,
               };
               countUser++;
           } while (!isUsernameUnique(user.name, onlineUsers));
       } else {
            user = cookieUser;
       }
        onlineUsers.push(user);

        // Send the initial data dump of the client's user, chat history, and online users
        socket.emit('user', user);
        socket.emit('chat history', chatHistory);
        allSockets.emit('online users', onlineUsers);
        console.log('user connected: ' + JSON.stringify(user));
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
