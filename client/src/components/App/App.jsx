/**
 * Name: Brian Pho
 * UCID: 10171873
 * Tutorial section: B03
 */
import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import io from 'socket.io-client';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './App.css';
import Chat from "../Chat/Chat";
import Users from "../Users/Users";

/**
 * App contains both the chat and users components
 */
class App extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;
        // Connect to the socket.io server at this endpoint
        this.socket = io('http://localhost:3001');
        // Check if the cookie has user data, otherwise set to default
        this.state = {user: cookies.get('user') || {name: 'Offline', color: '808080'}};
    }

    componentDidMount() {
        this.socket.emit('cookie user', this.state.user);

        this.socket.on('user', (user) => {
            // Update the state
            this.setState({user: user});

            // Update the cookie
            const { cookies } = this.props;
            cookies.set('user', this.state.user, { path: '/' });
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

export default withCookies(App);
