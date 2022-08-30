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
    }

    render() {
        return (
            <div className="History d-flex flex-column-reverse overflow-auto h-75 bg-white m-3">
                <Table hover size="sm">
                    <thead className="sticky-top thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Transaction</th>
                        <th className="number">Debit</th>
                        <th className="number">Credit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.journalHistory.map((entry, index) => {
                        return (<tr key={index}>
                            <td>{index}</td>
                            <td>{entry.date}</td>
                            <td>{entry.transaction}</td>
                            <td className="number">{entry.debit}</td>
                            <td className="number">{entry.credit}</td>
                        </tr>)
                    })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default History;
