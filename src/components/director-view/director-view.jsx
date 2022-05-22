import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick, movies } = this.props;

        return (
            <Card>
                <Card.Body>
                    <Card.Title>Director Info</Card.Title>
                    <Card.Text>Name: <span>{director.Name}</span></Card.Text>
                    <Card.Text>Bio:  <span>{director.Bio}</span></Card.Text>
                    <Card.Text>Birthyear: <span>{director.Birth}</span></Card.Text>
                    <Card.Text>Deathyear: <span>{director.Death}</span></Card.Text>
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
        )
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};