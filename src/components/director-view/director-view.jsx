import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick, movies } = this.props;

        return (
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
                    <Card.Title>Director Info</Card.Title>
                    <Card.Text><span className="label">Name: </span>{director.Name}</Card.Text>
                    <Card.Text><span className="label">Bio:  </span>{director.Bio}</Card.Text>
                    <Card.Text><span className="label">Birthyear: </span>{director.Birth}</Card.Text>
                    <Card.Text><span className="label">Deathyear: </span>{director.Death}</Card.Text>
                    </Container>
                    <p></p>
                    <Container>
                    <Link to={'/'}>
                        Back to Main
                    </Link>
                    </Container>
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