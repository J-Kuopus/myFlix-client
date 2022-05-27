// Implements useState Hook
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './registration-view.scss';

export function RegistrationView(props) {
    const [ username, setUsername] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
    
    // Declare hook for each input
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
    const [ emailErr, setEmailErr ] = useState('');


     // Validate user inputs
    const validate = () => {
        let isReq = true;
        if(!username) {
            setUsernameErr('Username is required');
            isReq = false;
        } else if (username.length < 5) {
            setUsernameErr('Username must be at least 5 characters long')
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password is required, must be at least 6 characters long');
            isReq = false;
        } else if(password.length < 6){
            setPasswordErr('Password must be at least 6 characters long');
            isReq = false;
        }
        if (!email) {
           setEmailErr('Please enter email address');
            isReq = false;
        } else if(email.indexOf('@') === -1) {
            setEmail('Email must be a valid email address');
            isReq = false
        }

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq) {
            //Send a request to the server for authentication
          axios.post('https://powerful-coast-48240.herokuapp.com/users', {
            username: username,
            password: password,
            email: email,
            birthday: birthday
          })
          .then(response => {
            const data = response.data;
            console.log(data);
            alert('Registration successful, please login!');
            window.open('/', '_self'); // '_self is needed so the page will open in current tab
            })
            .catch(response => {
                console.error(response);
                alert('Unable to register');
            });
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
            <Col>
            <CardGroup>
                <Card>
                    <Card.Body>
                    <Card.Title>Register a new account</Card.Title>
                    <Card.Header>Please enter the following information:</Card.Header>
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username: </Form.Label>
                        <Form.Control
                            type="text" 
                            value={username} 
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Must be at least 5 characters long"
                        />
                        {usernameErr && <p>{usernameErr}</p>} {/* Displays validation error */}
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password: </Form.Label>
                        <Form.Control 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Must be at least 6 characters long"
                        />{passwordErr && <p>{passwordErr}</p>}
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email: </Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                        />
                        {emailErr && <p>{emailErr}</p>}
                        <Form.Text className="muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicBirthdate">
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
                    </Card.Body>
                    <Card.Footer>
                        <Card.Text>Already registered? <Link to={'/'}>Sign in</Link> here</Card.Text>
                    </Card.Footer>
                </Card>
            </CardGroup>
            </Col>
            </Row>
        </Container>
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }),
};
