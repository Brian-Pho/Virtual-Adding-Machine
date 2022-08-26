/**
 * Name: Brian Pho
 * UCID: 10171873
 * Tutorial section: B03
 */
import React from 'react';
import './Chat.css';
import ChatInput from "./ChatInput";
import ChatHistory from "./ChatHistory";

/**
 * Chat contains the chat history and chat input
 */
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: props.user};
    }

    /**
     * Handles user being updated by parent component.
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if  (prevProps.user !== this.props.user) {
            this.setState({user: this.props.user});
        }
    }

    render() {
        const userColor = {
            color: `#${this.state.user.color}`
        };

        return (
            <div className="Chat text-center">
                <p>You are <b style={userColor} className="text-break">{this.state.user.name}</b>.</p>
                <ChatHistory socket={this.props.socket} user={this.state.user}/>
                <ChatInput socket={this.props.socket} user={this.state.user}/>
            </div>
        );
    }
}

export default Chat;
