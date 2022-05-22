import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, Form, FormControl, Container, Col, Row, Button } from 'react-bootstrap';
import './profile-view.scss';
import  UserDetailsView from './user-details-view';

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: [],
        };
        this.removeFav = this.removeFav.bind(this);
        this.setUsername = this.setUsername.bind(this);
    }

    //GETS user information
    getUser(token) {
        let user = localStorage.getItem('user');
        axios.get(`https://powerful-coast-48240.herokuapp.com/users/${user}`, {
            headers: { Authorization:`Bearer ${token}`},
        })
        .then((response) => {
            // Assigns result to the state
            this.setState({
                username: response.data.username,
                password: response.data.password,
                email: response.data.email,
                birthday: response.data.birthday,
                favoriteMovies: response.data.favoriteMovies,
            });
        })
        .catch((e) => console.log(e));
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }

    onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    editProfile = (e) => {
        e.preventDefault();
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        let newUser = this.state.username;
        console.log(newUser);
        axios.put(`https://powerful-coast-48240.herokuapp.com/users/${user}`,
        {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            birthday: this.state.birthday
        },
        { headers: { Authorization:`Bearer ${token}`}}
        )
        .then((response) => {
            this.setState({
                username: response.data.username,
                password: response.data.password,
                email: response.data.email,
                birthday: response.data.birthday,
            });
            localStorage.setItem('user', this.state.username);
            alert('Profile successfully updated!');
            window.open(`/users/${newUser}`, '_self');
        });
    };

        deleteProfile() {
            const username = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            axios.delete(`https://powerful-coast-48240.herokuapp.com/users/${username}`,
            
            { headers: { Authorization:`Bearer ${token}`}}
            )
            .then((response) => {
                console.log(response);
                alert('Profile was deleted');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            })
            .catch((e) => console.log(e));
        };

        setUsername(e) {
            this.setState({
                username: e.target.value,
            });
        };

        setPassword(value) {
            this.setState({
                password: value,
            });
        };

        setEmail(value) {
            this.setState({
                email: value,
            });
        };

        setBirthday(value) {
            this.setState({
                birthday: value,
            });
        };

        removeFav() {
            const user = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            const id = this.state.favoriteMovies;
            axios.delete('https://powerful-coast-48240.herokuapp.com/users/${user}/favoriteMovies/:movieId',

            { headers: { Authorization:`Bearer ${token}`}},
            {}
            )
            .then((response) => {
                console.log(response);
                alert('Movie was deleted from favorites!');
                window.open(`/movies/${id}`, '_self');
            })
            .catch((err) => console.log(err));
        }

        render() {
            const { movies } = this.props;
            const { favoriteMovies, username } = this.state;
            if(!username) {
                return null;
            }
            return (
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Form className="update-form">
                                          onSubmit={(e) => 
                                          this.editProfile(e, this.username, this.password, this.email, this.birthday)}
                                          <Container>
                                              <UserDetailsView />
                                              <Container>
                                                  <div>
                                                      <FormControl
                                                        type="text"
                                                        name="username"
                                                        placeholder="insert your new username here"
                                                        onChange={this.setUsername}
                                                        required
                                                      />
                                                      <Form.Text className="text-muted">
                                                          Your username must be at least 5 characters long
                                                      </Form.Text>
                                                  </div>
                                                  <div>
                                                      <FormControl
                                                        type="text"
                                                        name="password"
                                                        placeholder="insert your new password here"
                                                        onChange={(e) => this.setPassword(e.target.value)}
                                                        required
                                                      />
                                                      <Form.Text className="text-muted">
                                                          Your password must be at least 8 characters long
                                                      </Form.Text>
                                                  </div>
                                                  <div>
                                                      <FormControl
                                                        type="email"
                                                        name="email"
                                                        placeholder="insert your new email here"
                                                        onChange={(e) => this.setEmail(e.target.value)}
                                                        required/>
                                                  </div>
                                                  <div>
                                                      <FormControl
                                                        type="date"
                                                        name="birthday"
                                                        placeholder="insert your birthday here"
                                                        onChange={(e) => this.setBirthday(e.target.value)}
                                                      />
                                                  </div>
                                              </Container>
                                          </Container>
                                          <Container>
                                            <Button
                                                variant="danger"
                                                type="submit"
                                                onClick={this.editProfile}
                                                >
                                            </Button>
                                          </Container>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
        }

}

ProfileView.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            Title: PropTypes.string.isRequired,
            ImagePath: PropTypes.string.isRequired,
        })
    ).isRequired,
};
