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
    const [values, setValues] = useState ({
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
    });

     // Validate user inputs
    const validate = () => {
        let isReq = true;
        if(!username) {
            setValues({...values, usernameErr: 'Username Required'});
            isReq = false;
        } else if (username) {
            setValues({...values, usernameErr: 'Username must be at least 5 characters long'});
            isReq = false;
        }
        if (!password) {
            setValues({...values, passwordErr: 'Password Required'});
            isReq = false;
        } else if(password.length < 6){
            setValues({...values, passwordErr: 'Password must be at least 6 characters long'});
            isReq = false;
        }
        if (!email) {
            setValues({...values, emailErr: 'Email Requried'});
            isReq = false;
        } else if(email.indexOf('@') === -1) {
            setValues({...values, emailErr: 'Email is invalid'});
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
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
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
                    <Card.Title>Register a new account</Card.Title>
                    <Card.Header>Please enter the following information:</Card.Header>
                    <Form>
                        <Form.Group>
                        <Form.Label>Username: </Form.Label>
                        <Form.Control
                            type="text" 
                            value={username} 
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Enter a username"
                        />
                        {values.usernameErr && <p>{values.usernameErr}</p>} {/* Displays validation error */}
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter a password"
                        />{values.passwordErr && <p>{values.passwordErr}</p>}
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Email: </Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                        />
                        {values.emailErr && <p>{values.emailErr}</p>}
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
                        <p></p>
                        <p>Already registered? <Link to={'/'}>Sign in</Link> here</p>
                    </Form>
                </Card>
            </CardGroup>
            </Col>
            </Row>
        </Container>
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    }),
};

