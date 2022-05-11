import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';

// Imports MainView component
import  MainView  from './components/main-view/main-view';

// Import statement to indicate that you need to bundle './index.scss'
import './index.scss';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

// Main component 
class MyFlixApplication extends React.Component {
    render() {
        return (
            <Container>
                <Navbar>
                    <Navbar.Brand href="#home">myFlix</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#login">Login</Nav.Link>
                            <Nav.Link href="#update-profile">Update Profile</Nav.Link>
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




