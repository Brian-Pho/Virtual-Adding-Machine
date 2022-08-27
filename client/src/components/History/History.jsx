import React from 'react';
import Table from 'react-bootstrap/Table';
import './History.css';


class History extends React.Component {
    constructor(props) {
        super(props);
        this.socket = props.socket;
        this.state = {journalHistory: []};
    }

    componentDidMount() {
        this.socket.on('journal history', (journalHistory) => {
            this.setState({journalHistory: journalHistory})
        });

        this.socket.on('journal entry', (entry) => {
            this.setState((state) => ({
                journalHistory: state.journalHistory.concat(entry)
            }))
        });
    }

    render() {
        return (
            <Table striped hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Transaction</th>
                        <th>Debit</th>
                        <th>Credit</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.journalHistory.map((entry, index) => {
                        return (<tr key={index}>
                            <td>{index}</td>
                            <td>{entry.date}</td>
                            <td>{entry.transaction}</td>
                            <td>{entry.debit}</td>
                            <td>{entry.credit}</td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        );
    }
}

export default History;
