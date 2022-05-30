import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function FavoriteMoviesView(props) {
    const { movies, favoriteMovies, currentUser, token } = props;
  
    const favoriteMoviesId = favoriteMovies.map(m => m._id)
  
    const favoriteMoviesList = movies.filter(m => {
      return favoriteMoviesId.includes(m._id)
    })
  

const handleMovieDelete = (movieId) => {
    axios.delete(`https://powerful-coast-48240.herokuapp.com/users/${currentUser}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`The movie was removed from favorites list.`)
      window.open('/users/:Username', '_self');
    }).
    catch(error => console.error(error))

  return (
    <Container>
      {favoriteMoviesList.length === 0 ? (
          <p>You have no favorite movies yet.</p>
          ) : (
            favoriteMoviesList.map((movie) => {
              return (
              <Col xs={10} sm={8} md={6} lg={4} >
                <Card id="movie-card">
                  <Link to={`/movies/${movie._id}`}>
                    <Card.Img variant="top" src={movie.ImagePath} />
                  </Link>
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                      <Button className="button" variant="outline-primary" size="sm">Open</Button>
                    </Link>
                    <Button 
                    className="button ml-2" 
                    variant="outline-primary" 
                    size="sm" onClick={()=> {handleMovieDelete(movie._id)}} >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              )
            })
          )
        }
    </Container>
  )
}
}