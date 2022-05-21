import React from 'react';
import axios from 'axios';
import { Form, FormGroup, FormControl, Container, Card, Row, Col } from 'react-bootstrap';
import PropTypes, { string } from "prop-types";

// Displays user info
export class UserDetailsView extends React.Component {
    constructor() {
        super();
    }
    getUser(token) {
        let user= localStorage.getItem('user');
        axios.get('https://powerful-coast-48240.herokuapp.com/users/${user}', {
            headers: { Authorization:`Bearer ${token}`},
        })
        .then((response) => {
            this.props.setUserData(responde.data);
        })
        .catch((e) => console.log(e))
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }

    render() {
        let { userData } = this.props;
        console.log(userData);
        return (
            <Container>
                <div>Hello, {userData.username}</div>
                <Card.Title>View and update your details</Card.Title>
                <Container>
                    <Col>
                    <FormGroup>
                        <Form.Label>Username</Form.Label>
                        <Container>
                            <FormControl
                              type="text"
                              name="username"
                              placeholder={userData.username}
                              disabled
                              />
                        </Container>
                    </FormGroup>

                    <FormGroup>
                        <Form.Label>Password</Form.Label>
                        <Container>
                            <FormControl
                              type="text"
                              name="password"
                              placeholder={userData.password}
                              disabled
                            />
                        </Container>
                    </FormGroup>

                    <FormGroup>
                        <Form.Label>Email</Form.Label>
                        <Container>
                            <FormControl
                              type="email"
                              name="email"
                              placeholder={userData.email}
                              disabled
                            />
                        </Container>
                    </FormGroup>

                    <FormGroup>
                        <Form.Label>Birth date</Form.Label>
                        <Container>
                            <FormControl
                              type="text"
                              name="birthday"
                              placeholder={userData.birthday}
                              disabled
                            />
                        </Container>
                    </FormGroup>
                    </Col>
                </Container>
            </Container>
        );
    }
}

UserDetailsView.propTypes = {
    setUserData: PropTypes.func.isRequired,
    userData: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired,
        favoriteMovies: PropTypes.arrayOf(string),
    }).isRequired,
};