import React, { useState, useEffect } from 'react';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile-view.scss';
import axios from 'axios';
import PropTypes, { string } from 'prop-types';
/* import { FavoriteMoviesView } from './favorite-movies';
import { UpdateUserView } from './update-user' */;

export function ProfileView(props) {
  const [ user, setUser ] = useState(props.user);
  const [ movies, setMovies ] = useState(props.movies);
  const [ favoriteMovies, setFavoriteMovies ] = useState([]);
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  // GETS user info
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

  //DELETES user profile
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

  const favoriteMoviesId = favoriteMovies.map(m => m._id)
  
  const favoriteMoviesList = movies.filter(m => {
    return favoriteMoviesId.includes(m._id)
  })

  //DELETES movie from favorites list
  const handleMovieDelete = (movieId) => {
    axios.delete(`https://powerful-coast-48240.herokuapp.com/users/${currentUser}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`The movie was removed from favorites list.`)
      window.open('/users/:Username', '_self');
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
                    <Card.Text><span className="label">Favorite Movies: </span></Card.Text>
                    <Container>
                        {favoriteMoviesList.map((movie) => {
                                return (
                                  <div key={movie._id}>
                                    <img src={movie.ImagePath} />
                                    <Link to={`/movies/${movie._id}`} >
                                    <h4>{movie.Title}</h4>
                                    </Link>
                                    <button variant="secondary"
                                            onClick={()=> {handleMovieDelete(movie._id)}}>
                                    </button>
                                  </div>
                                )
                              }
                            )
                          }
                    </Container>
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
            {/* <UpdateUserView user={user}/> */}
            </Card>
            <Button variant="secondary" onClick={handleDelete}>Delete profile</Button>
        </Container>
        );
  };