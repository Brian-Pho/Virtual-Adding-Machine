import React from 'react';
import io from 'socket.io-client';
import Container from "react-bootstrap/Container";
import './App.css';
import History from "../History/History"
import Entry from "../Entry/Entry";
import Utilities from "../Utilities/Utilities";

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
            <div className="App vh-100 bg-light">
                <Container className="container-fluid h-100">
                    <h3 className="text-center">
                        LegacyX Virtual Adding Machine
                    </h3>
                    <History socket={this.socket}/>
                    <Utilities socket={this.socket}/>
                    <Entry socket={this.socket}/>
                </Container>
            </div>
        );
    }
}

export default App;
