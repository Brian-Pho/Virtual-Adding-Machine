import React from 'react';
import './Utilities.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';


class Utilities extends React.Component {
    constructor(props) {
        super(props);
        this.socket = props.socket;
        this.state = {journalHistory: [], balance: 0};
    }

    componentDidMount() {
        this.socket.on('journal history', (journalHistory) => {
            this.setState({journalHistory: journalHistory})
        });

        this.socket.on('journal balance', (balance) => {
            this.setState({balance: balance})
        });
    }

    handleClear() {
        this.socket.emit('journal history clear');
    }

    handleSave () {
        const fileData = JSON.stringify(this.state.journalHistory, null, 2);
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download =  'journal_history.txt';
        link.href = url;
        link.click();
    }

    render() {
        return (
            <Row className="justify-content-between m-3">
                <Button variant="danger" onClick={() => this.handleClear()}>
                    Clear History
                </Button>
                <Button variant="secondary" onClick={() => this.handleSave()}>
                    Save History to File
                </Button>
                <h5>Balance: {this.state.balance}</h5>
            </Row>
        );
    }
}

export default Utilities;
