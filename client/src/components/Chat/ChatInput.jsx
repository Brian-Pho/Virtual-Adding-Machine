/**
 * Name: Brian Pho
 * UCID: 10171873
 * Tutorial section: B03
 */
import React from "react";
import './ChatInput.css';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        // Create a React reference for text input
        this.textInput = React.createRef();
        this.socket = props.socket;
        this.state = {user: props.user};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if  (prevProps.user !== this.props.user) {
            this.setState({user: this.props.user});
        }
    }

    /**
     * Sends the user's message to the server
     */
    sendMsg() {
        const currentText = this.textInput.current.value;
        // If no message, don't do anything
        if (!currentText) {
            return;
        }
        // Reset textInput to empty
        this.textInput.current.value = '';

        // If the user's sending a command, then send it in a different event than a message
        if (currentText.startsWith('/')) {
            this.socket.emit('chat command', currentText);
            // Return here to prevent the command being sent as a message
            return;
        }

        const msg = {
            user: this.state.user,
            text: currentText,
        };
        this.socket.emit('chat message', msg);
    }

    render() {
        return (
            <div className="ChatInput rounded-bottom">
                <InputGroup className="mb-3">
                    <FormControl
                        ref={this.textInput}
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                this.sendMsg()
                            }
                        }}/>
                    <InputGroup.Append>
                        <Button
                            variant="outline-success"
                            onClick={() => this.sendMsg()}
                        >Send
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
}

export default ChatInput;
