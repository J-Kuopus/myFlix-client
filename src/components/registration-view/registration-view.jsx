// Implements useState Hook
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
    const [ username, setUsername] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
     // Declare hook for each input
    const [values, setValues] = useState ({
        nameErr: '',
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
    });

     // Validate user inputs
    const validate = () => {
        let isReq = true;
        if(!username){
            setUsernameErr('Username Required');
            isReq = false;
        }else if(username.length < 2){
            setUsernameErr('Username must be at least 2 characters long');
            isReq = false;
        }
        if(!password){
            setPasswordErr('Password Required');
            isReq = false;
        }else if(password.length < 6){
            setPasswordErr('Password must be at least 6 characters long');
            isReq = false;
        }
        return isReq;
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq) {
            //Send a request to the server for authentication
          axios.post('https://powerful-coast-48240.herokuapp.com/login', {
            Username: username,
            Password: password
          })
          .then(() => {
            console.log(username, password);
            props.onRegistration(username);
          })
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
                            variant="danger"
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

