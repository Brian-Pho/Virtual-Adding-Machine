import React from 'react';
import io from 'socket.io-client';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import './App.css';
import History from "../History/History"
import Entry from "../Entry/Entry";

const SERVER_URI = 'http://localhost:3001';


class App extends React.Component {
    constructor(props) {
        super(props);
        // Connect to the socket.io server at this endpoint
        this.socket = io(SERVER_URI);
    }

    componentDidMount() {
        this.socket.emit('initial connection');
    }

    render() {
        return (
            <div className="App text-center">
                <Container className="container-fluid h-100">
                    <Row>
                        <History socket={this.socket}/>
                    </Row>
                    <Row>
                        <Entry socket={this.socket}/>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
