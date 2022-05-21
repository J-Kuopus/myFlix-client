import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

import './navbar.scss';
import image from '../../../img/rv-logo.png';

export function NavbarView() {
    let user = localStorage.getItem('user');

    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    const isAuth = () => {
        if (typeof window == 'undefined') {
            return false;
        }
        if (localStorage.getItem('token')) {
            return localStorage.getItem('token')
        } else {
            return false;
        }
    };


        return (
            <Container>
                <Navbar className="navbar" fixed="top" bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand className="navbar-brand" href="/">
                            <img
                                src={image}
                                width="70"
                                className="navbar-logo d-inline-block align-top"
                                alt="Retro Video logo"
                            />{' '}
                            Retro Video
                        </Navbar.Brand>
                    </Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    {isAuth() && (
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Nav.Link to={`/users/${user}`}>Hello, {user}</Nav.Link>
                            <Nav.Link to={`/users/${user}`}>Profile</Nav.Link>
                            <Nav.Link onClick={() => { 
                                onLoggedOut(); 
                            }}>Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    )}
                </Navbar>
            </Container>
        );
}
