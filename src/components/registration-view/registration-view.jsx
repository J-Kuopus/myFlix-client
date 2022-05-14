// Implements useState Hook
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
    const [ username, setUsername] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        // Send a request to the server for authentication
        // then call props.onLoggedIn(username)
        props.onRegistration(username);
    };

    return (
        <Container>
            <Row className="justify-content-center">
            <Col lg={5}>
            <CardGroup>
                <Card>
                    <Card.Title>Please register</Card.Title>
                    <Form>
                        <Form.Group>
                        <Form.Label>Username: </Form.Label>
                        <Form.Control
                            type="text" 
                            value={username} 
                            onChange={e => setUsername(e.target.value)}
                            required
                            placeholder="Enter a username"
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            required
                            placeholder="Enter a password"
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Email: </Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                            required 
                            placeholder="Enter your email address"
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Birthday: </Form.Label>
                        <Form.Control 
                            type="date" 
                            value={birthday} 
                            onChange={e => setBirthday(e.target.value)} 
                            placeholder="Enter your birthdate (optional)"
                        />
                        </Form.Group>
                        <Button 
                            variant="primary"
                            type="submit" 
                            onClick={handleSubmit}>Submit
                        </Button>
                    </Form>
                </Card>
            </CardGroup>
            </Col>
            </Row>
        </Container>
    );
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};

