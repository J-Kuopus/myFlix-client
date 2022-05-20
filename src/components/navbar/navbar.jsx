import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

import './navbar.scss';

export class NavbarView extends React.Component {
    render() {
        return (
            <Container>
                <Navbar className="navbar" fixed="top" bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand className="navbar-brand" href="#home">
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
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="#">Profile</Nav.Link>
                            <Nav.Link onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        );
    }
}
