import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Container fluid className="movie-view">
                <Row className="justify-content-md-center">
                    <Col className="m-auto">
                        <img className="d-block mx-auto img-fluid w-60" 
                             src={movie.ImagePath} 
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="movie-title">
                            <span className="label"> Title: </span>
                            <span className="value">{movie.Title}</span>
                        </div>
                        <div className="movie-description">
                            <span className="label">Description: </span>
                            <span className="value">{movie.Description}</span>
                        </div>
                        <div className="release-year">
                            <span className="label">Released: </span>
                            <span className="value">{movie.Released}</span>
                        </div>
                        <div className="movie-genre">
                            <span className="label">Genre: </span>
                            <span className="value">{movie.Genre.Name}</span>
                        </div>
                        <div className="genre-description">
                            <span className="label">Description: </span>
                            <span className="value">{movie.Genre.Description}</span>
                        </div>
                        <div className="movie-director">
                            <span className="label">Director: </span>
                            <span className="value">{movie.Director.Name}</span>
                        </div>
                        <div className="director-bio">
                            <span className="label">Bio: </span>
                            <span className="value">{movie.Director.Bio}</span>
                        </div>
                        <div className="director-birth">
                            <span className="label">Birth: </span>
                            <span className="value">{movie.Director.Birth}</span>
                        </div>
                        <div className="director-death">
                            <span className="label">Death: </span>
                            <span className="value">{movie.Director.Death}</span>
                        </div>
                        <div className="movie-button-div">
                            <Button
                                variant="danger" 
                                className="movie-button" 
                                onClick={() => { onBackClick(null); }}>Back
                            </Button>
                        </div>
                    </Col>
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