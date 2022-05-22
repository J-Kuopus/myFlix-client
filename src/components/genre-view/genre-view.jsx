import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class GenreView extends React.Component {
    render() {
        const { genre, movie, onBackClick } = this.props;

        return (
            <Card>
                <Card.Body>
                    <Container className="genre-view">
                        <Card.Title><span>{genre.Name}</span> Genre</Card.Title>
                        <Card.Text>Description: </Card.Text>
                        <span>{genre.Description}</span>
                    </Container>
                    <Card.Footer>
                    <Button
                        variant="danger"
                        type="submit"
                        onClick={() => {
                            onBackClick();
                        }}>Back
                    </Button>
                    <Link to={'/'}>
                        <Button
                            type="submit">Back to movies
                        </Button>
                    </Link>
                    </Card.Footer>
                </Card.Body>
            </Card>
        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};