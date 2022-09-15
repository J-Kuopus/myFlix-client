// Implements useState Hook
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RV from '../../../img/rv-logo.png';

import './login-view.scss';

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
        <Container className="login-view">
            <Row className="justify-content-center">
            <Col xxl={8} xl={8} lg={9} md={10} sm={12}>
            <div className='title-wrapper'>
                        <img src={RV} alt="retro video logo" />
                        <h1 className="welcome-text">Welcome to Retro Video!</h1>
                        <p className="slogan">A mini movie database that's a blast from the past.</p>
            </div>
                <Card className="login-card">
                    <Card.Body>
                    <Card.Header>Please enter your username and password to enter.</Card.Header>
                    <Form className="login-form" noValidate>
                        <Form.Group className="login-input" controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control 
                                type ="text"
                                value={username} 
                                onChange={e => setUsername(e.target.value)} 
                            />
                            {/* Displays validation error */}
                            {usernameErr && <p>{usernameErr}</p>}
                        </Form.Group>
                                
                        <Form.Group className="login-input" controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                                <Form.Control 
                                    type="password"
                                    value={password} 
                                    onChange={ e => setPassword(e.target.value)} 
                                />
                                {/* Displays validation error */}
                                {passwordErr && <p>{passwordErr}</p>}
                        </Form.Group>
                        <p></p>
                        <p></p>
                        <Button 
                            variant="danger" 
                            type="submit" 
                            onClick={handleSubmit}>Let's Go!
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
