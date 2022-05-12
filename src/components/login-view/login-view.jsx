// Implements useState Hook
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
    const [ username, setUsername] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        // Send a request to the server for authentication
        // then call props.onLoggedIn(username)
        props.onLoggedIn(username);
    };

    return (
        <Container>
            <Row>
            <Col>
            <CardGroup>
                <Card>
                    <Card.Title>Welcome to myFlix!</Card.Title>
                    <Card.Header>Please enter your username and password to enter.</Card.Header>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type ="text" onChange={e => setUsername(e.target.value)} />
                        </Form.Group>
                                
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" onChange={ e => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    Submit
                        </Button>
                    </Form>
                </Card>
            </CardGroup>
            </Col>
            </Row>
        </Container>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
};
