import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup, Container, Col, Row, ListGroup } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Container className="movie-view d-flex position-absolute top-50 start-50 translate-middle">
                <Row sm={1} md={2}>
                    <Col>   
                        <ListGroup>
                            <ListGroup.Item className="movie-title">{movie.Title}</ListGroup.Item>
                            <ListGroup.Item className="movie-genre">
                                <span className="label">Genre: </span>{movie.Genre.Name}</ListGroup.Item>
                            <ListGroup.Item className="movie-director">
                                <span className="label">Director: </span>{movie.Director.Name}</ListGroup.Item>
                            <ListGroup.Item className="release-year">
                                <span className="label">Released: </span>{movie.Released}</ListGroup.Item>
                            <ListGroup.Item><span className="label">Summary: </span>{movie.Description}</ListGroup.Item> 
                        </ListGroup> 
                    </Col>
                    <Col>
                    <div className="img-wrapper">
                        <img 
                            className="movie-poster d-block" 
                            src={movie.ImagePath}
                        />
                    </div>
                    </Col>
                    <div>
                    <Button 
                        className="movie-button" 
                        variant="danger" 
                        onClick={() => { onBackClick(null); }}>Back
                    </Button>
                    </div>
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