import React, { useState, useEffect } from 'react';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile-view.scss';
import axios from 'axios';
import PropTypes, { string } from 'prop-types';

export function ProfileView(props) {
  const [ user, setUser ] = useState(props.user);
  const [ movies, setMovies ] = useState(props.movies);
  const [ favoriteMovies, setFavoriteMovies ] = useState([]);
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const getUser = () => {
    axios.get(`https://powerful-coast-48240.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      setUser(response.data);
      setFavoriteMovies(response.data.FavoriteMovies)
    })
    .catch(error => console.error(error))
  }

  useEffect(() => {
    getUser();
  }, [])

      return (
        <Container>
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
                <Card.Text><span className="label">Password: </span>******</Card.Text>
                <Card.Text><span className="label">Email: </span>{user.Email}</Card.Text>
                <Card.Text><span className="label">Birthday: </span>{user.Birthday}</Card.Text>
                <Card.Text><span className="label">Favorite Movies: </span>{user.FavoriteMovies}</Card.Text>
                </Container>
                <p></p>
                    <Container>
                    <Link to={'/'}>
                        Back to Main
                    </Link>
                    </Container>
                </Card.Body>
            </Card>
        </Container>
        );
  };

/* ProfileView.propTypes = {
  user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      birthday: PropTypes.string.isRequired,
      favoriteMovies: PropTypes.arrayOf(string),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
 */
