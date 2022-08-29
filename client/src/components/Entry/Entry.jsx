import React from 'react';
import './Entry.css';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


class Entry extends React.Component {
    constructor(props) {
        super(props);
        this.socket = props.socket;
        this.entryDateInput = React.createRef();
        this.entryTransactionInput = React.createRef();
        this.entryDebitInput = React.createRef();
        this.entryCreditInput = React.createRef();
    }

    handleSubmit(event) {
        // const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
        // this.setState({validated: true});

        const dateInput = this.entryDateInput.current.value;
        const transactionInput = this.entryTransactionInput.current.value;
        const debitInput = this.entryDebitInput.current.value;
        const creditInput = this.entryCreditInput.current.value;

        if (!dateInput || !transactionInput || !debitInput || !creditInput) {
            return;
        }

        const journalEntry = {
            date: dateInput,
            transaction: transactionInput,
            debit: debitInput,
            credit: creditInput,
        };

        this.socket.emit('journal entry', journalEntry);

        // Clear the input fields
        this.entryDateInput.current.value = "";
        this.entryTransactionInput.current.value = "";
        this.entryDebitInput.current.value = "";
        this.entryCreditInput.current.value = "";
    }

    render() {
        return (
            <Form className="m-3">
                <Row>
                    <Col>
                        <FormControl ref={this.entryDateInput} placeholder="Date" required />
                    </Col>
                    <Col>
                        <FormControl ref={this.entryTransactionInput} placeholder="Transaction" required />
                    </Col>
                    <Col>
                        <FormControl ref={this.entryDebitInput} placeholder="Debit" required />
                    </Col>
                    <Col>
                        <FormControl ref={this.entryCreditInput} placeholder="Credit" required />
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={() => this.handleSubmit()}>
                            Add Entry
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Entry;
