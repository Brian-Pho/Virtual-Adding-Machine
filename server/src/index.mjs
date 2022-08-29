import express from 'express';
import http from 'http';
import io from 'socket.io';

const index = express();
const server = http.createServer(index);
const allSockets = io(server);

index.get('/', (req, res) => {
    res.send("<p>Server Page. This page isn't used.</p>");
});

// const journalHistory = [];
const journalHistory = [
    {   date: 'fdsa',
        transaction: 'fdsa',
        debit: 123,
        credit: 321}
];

// On connection of a new client
allSockets.on('connection', (socket) => {
    // Handle client initial connection
    socket.on('initial connection', () => {
        // Send the initial data dump of journal history
        socket.emit('journal history', journalHistory);
        socket.emit('journal balance', calculateJournalBalance(journalHistory));
        console.log('user connected');
    });

    // Add journal entry
    socket.on('journal entry', (msg) => {
        journalHistory.push(msg);
        socket.emit('journal history', journalHistory);
        socket.emit('journal balance', calculateJournalBalance(journalHistory));
        console.log('new entry: ' + JSON.stringify(msg));
    });

    // Clear journal history
    socket.on('journal history clear', () => {
        journalHistory.length = 0;
        console.log('clear journal history');
    });

    // Handle disconnects
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3001, () => {
    console.log('listening on http://localhost:3001/');
});


/**
 * Calculates the journal's balance.
 * @param journalHistory
 * @returns {number}
 */
export function calculateJournalBalance(journalHistory) {
    let total_debit = 0;
    let total_credit = 0;

    for (let entry of journalHistory) {
        total_debit += entry.debit;
        total_credit += entry.credit;
    }

    return total_debit - total_credit;
}