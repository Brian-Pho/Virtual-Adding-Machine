// List of valid commands
const validCommands = ['/nick', '/nickcolor'];

/**
 * Checks if the given command is valid.
 * @param cmd
 * @param onlineUsers
 */
export function isValidCommand(cmd, onlineUsers) {
    const cmdSplit = cmd.split(" ");

    // Check number of arguments
    if (cmdSplit.length !== 2) {
        throw `Invalid number (${cmdSplit.length}) of arguments. `;
    }

    const command = cmdSplit[0];
    const arg = cmdSplit[1];
    // Check if command exists
    if (!validCommands.includes(command)) {
        throw `Command (${command}) doesn't exist.`;
    }

    // Check if new nickname is unique
    if (command === '/nick' && !isUsernameUnique(arg, onlineUsers)) {
        throw `Nickname (${arg}) isn't unique.`;
    }

    // Check if valid color
    if (command === '/nickcolor' && !(/[0-9A-F]{6}$/i.test(arg))) {
        throw `Invalid nickname color (${arg}).`;
    }
}

/**
 * Handles the given command.
 * @param cmd
 * @param user
 * @param onlineUsers
 */
export function handleCommand(cmd, user, onlineUsers) {
    const cmdSplit = cmd.split(" ");
    const command = cmdSplit[0];
    const arg = cmdSplit[1];
    const userIndex = onlineUsers.indexOf(user);

    // Update the user's nickname
    if (command === '/nick') {
        user.name = arg;
        onlineUsers[userIndex].name = arg;
    }

    // Update the user's color
    if (command === '/nickcolor') {
        user.color = arg;
        onlineUsers[userIndex].color = arg;
    }
}

/**
 * Checks if the given username is unique.
 * @param username
 * @param onlineUsers
 * @returns {boolean}
 */
export function isUsernameUnique(username, onlineUsers) {
    const usernames = onlineUsers.map((user) => user.name);
    return !usernames.includes(username)
}
