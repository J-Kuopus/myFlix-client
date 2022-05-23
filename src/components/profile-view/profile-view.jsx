import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: [],
        };
        this.removeFav = this.removeFav.bind(this);
        this.setUsername = this.setUsername.bind(this);
    }
     //GETS user information
     getUser(token) {
        let user = localStorage.getItem('user');
        axios.get('https://powerful-coast-48240.herokuapp.com/users/:Username', {
            headers: { Authorization:`Bearer ${token}`},
        })
        .then((response) => {
            // Assigns result to the state
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday,
                FavoriteMovies: response.data.FavoriteMovies,
            });
        })
        .catch((err) => console.log(err));
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }


    render() {
        const { user, onBackClick } = this.props;

        return (
            <Card>
                <Card.Body>
                    <Card.Header>
                        <Button
                            variant="danger"
                            type="submit"
                            onClick={() => {
                                onBackClick();
                            }}>Back
                        </Button>
                    </Card.Header>
                    <p></p>
                    <Container>
                    <Card.Title>Profile Info</Card.Title>
                    <Card.Text><span className="label">Username: </span>{user.Username}</Card.Text>
                    <Card.Text><span className="label">Password  </span>{user.Password}</Card.Text>
                    <Card.Text><span className="label">Email: </span>{user.Email}</Card.Text>
                    <Card.Text><span className="label">Birthday: </span>{user.Birthday}</Card.Text>
                    </Container>
                    <p></p>
                    <Container>
                    <Link to={'/'}>
                        Back to Main
                    </Link>
                    </Container>
                </Card.Body>
            </Card>
        )
    }
}

ProfileView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequried,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};