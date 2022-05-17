import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup, Container, Col, Row, ListGroup } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Container className="movie-view justify-content-md-center">
                <Row>
                    <Col md={8}>   
                        <ListGroup>
                            <ListGroup.Item className="movie-title">{movie.Title}</ListGroup.Item>
                            <ListGroup.Item className="movie-genre">
                                <span className="label">Genre: </span>{movie.Genre.Name}</ListGroup.Item>
                            <ListGroup.Item className="movie-director">
                                <span className="label">Director: </span>{movie.Director.Name}</ListGroup.Item>
                            <ListGroup.Item className="release-year">
                                <span className="label">Released: </span>{movie.Released}</ListGroup.Item>
                        </ListGroup>  
                        <div><span className="label">Summary: </span>{movie.Description}</div>  
                    </Col>
        
                    <Col md={4}> 
                        <img 
                            className="movie-poster d-block" 
                            src={movie.ImagePath}
                        />
                    </Col>
                    <Button 
                        className="movie-button" 
                        variant="danger" 
                        onClick={() => { onBackClick(null); }}>Back
                    </Button>
                </Row>
            </Container>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Released: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string.isRequired
        }),
    }).isRequired,
};