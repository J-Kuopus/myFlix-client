import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

// Imports MainView component
import  MainView  from './components/main-view/main-view';

// Import statement to indicate that you need to bundle './index.scss'
import './index.scss';

import image from '../img/rv-logo.png';

// Main component 
class MyFlixApplication extends React.Component {
    render() {
        return (
            <Container>
                <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">
                            <img
                                src={image}
                                width="300"
                                className="navbar-logo d-inline-block align-top"
                                alt="Retro Video logo"
                            />
                        </Navbar.Brand>
                    </Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Nav.Link href="#login">Login</Nav.Link>
                            <Nav.Link href="#update-profile">Profile</Nav.Link>
                            <Nav.Link href="#logout">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <MainView />
            </Container>
        );
    }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);




