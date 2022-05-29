import React from 'react';
import axios from 'axios';
import { Form, FormGroup, FormControl, Container, Card, Row, Col } from 'react-bootstrap';
import PropTypes, { string } from "prop-types";

// Displays user info
class UserDetailsView extends React.Component {
    constructor() {
        super();
    }
    getUser(token) {
        localStorage.getItem('user');
        axios.get('https://powerful-coast-48240.herokuapp.com/users/:Username', {
            headers: { Authorization:`Bearer ${token}`},
        })
        .then((response) => {
            this.props.setUserData(response.data);
        })
        .catch((err) => console.log(err))
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
                <div>Hello, {userData.Username}</div>
                <Card.Title>View and update your details</Card.Title>
                <Container>
                    <Col>
                    <FormGroup>
                        <Form.Label>Username</Form.Label>
                        <Container>
                            <FormControl
                              type="text"
                              name="username"
                              placeholder={userData.Username}
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
                              placeholder={userData.Password}
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
                              placeholder={userData.Email}
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
                              placeholder={userData.Birthday}
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

export default UserDetailsView;

UserDetailsView.propTypes = {
    setUserData: PropTypes.func.isRequired,
    userData: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired,
        FavoriteMovies: PropTypes.arrayOf(string),
    }).isRequired,
};