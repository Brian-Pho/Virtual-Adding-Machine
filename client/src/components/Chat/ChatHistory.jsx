/**
 * Name: Brian Pho
 * UCID: 10171873
 * Tutorial section: B03
 */
import React from "react";
import moment from "moment";
import './ChatHistory.css';

class ChatHistory extends React.Component {
    constructor(props) {
        super(props);
        this.socket = props.socket;
        this.state = {
            history: [],
            user: props.user,
        };
    }

    /**
     * Sets up the socket.io listeners
     */
    componentDidMount() {
        // Handle initialization of history
        this.socket.on('chat history', (chatHistory) => {
            this.setState({history: chatHistory})
        });

        // Handle incoming messages
        this.socket.on('chat message', (msg) => {
            this.addMsgToHistory(msg);
        });

        // Handle server response to commands
        this.socket.on('chat command', (cmd) => {
            this.addMsgToHistory(cmd);
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if  (prevProps.user !== this.props.user) {
            this.setState({user: this.props.user});
        }
    }

    /**
     * Adds a message to the chat history.
     * @param msg
     */
    addMsgToHistory(msg) {
        this.setState((state) => ({
            history: state.history.concat(msg)
        }))
    }

    formatUserMsg(msg, index) {
        // Get the message user's color
        const userColor = {color: `#${msg.user.color}`};
        // Get the message timestamp and format it
        const timestamp = moment.unix(msg.timestamp).format("H:mm");
        // Build the message to be displayed
        let userMsg = (<>{timestamp} <span style={userColor}>{msg.user.name}</span>: {msg.text}</>);

        // If the message was sent by the user, bold the message
        if (JSON.stringify(msg.user.name) === JSON.stringify(this.state.user.name)) {
            userMsg = (<b>{userMsg}</b>);
        }

        return (
            <p key={index} className="text-break m-0">{userMsg}</p>
        );
    }

    render() {
        return (
            <div className="ChatHistory d-flex flex-column-reverse overflow-auto text-left p-3 h-75 rounded-top">
            {this.state.history.slice(0).reverse().map(
                (msg, index) => this.formatUserMsg(msg, index)
            )}
            </div>
        );
    }
}

export default ChatHistory;
