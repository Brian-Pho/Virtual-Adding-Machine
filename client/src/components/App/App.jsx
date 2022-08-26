import React from 'react';
import io from 'socket.io-client';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './App.css';
import Chat from "../Chat/Chat";
import Users from "../Users/Users";

const SERVER_URI = 'http://localhost:3001';

/**
 * App contains both the chat and users components
 */
class App extends React.Component {
    constructor(props) {
        super(props);
        // Connect to the socket.io server at this endpoint
        this.socket = io(SERVER_URI);
    }

    componentDidMount() {
        this.socket.emit('initial connection');
        this.socket.on('journal history', (journalHistory) => {
            this.setState({journalHistory: journalHistory});
        });
    }

    render() {
        return (
            <div className="App text-center">
                <Container className="container-fluid h-100">
                    <Row className="rounded-bottom h-100">
                        <Col md={8} className="h-100">
                            <h2 className="m-2">Chat</h2>
                            <Chat socket={this.socket} user={this.state.user}/>
                        </Col>
                        <Col md={4} className="h-100">
                            <h2 className="m-2">Users</h2>
                            <Users socket={this.socket}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
