// Implements useState Hook
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './login-view.scss';
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

export function LoginView(props) {
    const [ username, setUsername] = useState('');
    const [ password, setPassword ] = useState('');
    // Declare hook for each input
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');

    // Validate user inputs
    const validate = () => {
        let isReq = true;
        if(!username){
            setUsernameErr('Username Required');
            isReq = false;
        }else if(username.length < 5){
            setUsernameErr('Username must be at least 5 characters long');
            isReq = false;
        }
        if(!password){
            setPasswordErr('Password Required');
            isReq = false;
        }else if(password.length < 6){
            setPasswordErr('Password must be at least 6 characters long');
            isReq = false;
        } return isReq;  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq) {
        //Send a request to the server for authentication
          axios.post('https://powerful-coast-48240.herokuapp.com/login', {
            Username: username,
            Password: password
          })
          .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
          })
          .catch(response => {
            console.error(response);
            alert('Unable to login');
        });
        }
    };
    
    return (
        <Container>
            <Row className="justify-content-center">
            <Col>
            <CardGroup>
                <Card className="login-card">
                    <Card.Body>
                    <Card.Title>Welcome to Retro Video!</Card.Title>
                    <Card.Header>Please enter your username and password to enter.</Card.Header>
                    <Form noValidate>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control 
                                type ="text"
                                value={username} 
                                onChange={e => setUsername(e.target.value)} 
                            />
                            {/* Displays validation error */}
                            {usernameErr && <p>{usernameErr}</p>}
                        </Form.Group>
                                
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                                <Form.Control 
                                    type="password"
                                    value={password} 
                                    onChange={ e => setPassword(e.target.value)} 
                                />
                                {/* Displays validation error */}
                                {passwordErr && <p>{passwordErr}</p>}
                        </Form.Group>
                        <Button 
                            variant="danger" 
                            type="submit" 
                            onClick={handleSubmit}>Submit
                        </Button>
                    </Form>
                    </Card.Body>
                    <Card.Footer>
                        <Card.Text>Don't have an account? You can register here.</Card.Text>
                        <Link to={'/register'}>
                        <Button 
                            variant="outline-secondary"
                            size="sm"
                            type="submit">
                            Register
                        </Button>
                        </Link>
                    </Card.Footer>
                </Card>
            </CardGroup>
            </Col>
            </Row>
        </Container>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { setUser })(LoginView);
