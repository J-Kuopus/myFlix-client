import React, { useState, useEffect } from 'react';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile-view.scss';
import axios from 'axios';
import PropTypes, { string } from 'prop-types';
import { FavoriteMoviesView } from './favorite-movies';
import { UpdateUserView } from './update-user';

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

  const handleDelete = () => {
    axios.delete(`https://powerful-coast-48240.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`The profile ${user.Username} was successfully deleted.`)
      localStorage.clear();
      window.open('/register', '_self');
    }).
    catch(error => console.error(error))
  }

      return (
        <Container>
            <Card>
              <Card.Body>
                <Container>
                  <Card.Title>Profile Info</Card.Title>
                <Card.Text><span className="label">Username: </span>{user.Username}</Card.Text>
                <Card.Text><span className="label">Password: </span>******</Card.Text>
                <Card.Text><span className="label">Email: </span>{user.Email}</Card.Text>
                <Card.Text><span className="label">Birthday: </span>{user.Birthday}</Card.Text>
                <Card.Text><span className="label">Favorite Movies: </span>{user.FavoriteMovies}</Card.Text>
                {/* <FavoriteMoviesView 
                  movies={movies} 
                  favoriteMovies={favoriteMovies} 
                  currentUser={currentUser} 
                  token={token}/> */}
                </Container>
                <p></p>
                    <Container>
                    <Link to={'/'}>
                        Back to Main
                    </Link>
                    </Container>
                </Card.Body>
            </Card>
            <Card>
            <UpdateUserView user={user}/>
            </Card>
            <Button variant="secondary" onClick={handleDelete}>Delete profile</Button>
        </Container>
        );
  };