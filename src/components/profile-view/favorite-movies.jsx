import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FavoriteMovies({ favoriteMovieList }) {
    return (
        <Container>
            <Card>
                <Card.Text>Favorite Movies</Card.Text>
                {favoriteMovieList.map((movies) => {
                    return (
                        <div key={movies._id}>
                            <img src={movies.ImagePath} />
                            <Link to={'movies/:MovieID'}>
                                {movies.Title}
                            </Link>
                            <Button variant="secondary"
                                    onClick={() => removeFav(movies._id)}>Remove from list</Button>
                        </div>
                    )
                })};
            </Card>
        </Container>
    )
}

export default FavoriteMovies;