import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class GenreView extends React.Component {
    render() {
        const { genre, movie, onBackClick } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
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
                                    <Card.Title><span>{genre.Name}</span> Genre</Card.Title>
                                    <Card.Text><span className="label">Description: </span></Card.Text>
                                    <Card.Text>{genre.Description}</Card.Text>
                                    <Link to={'/'}>
                                        Back to Main
                                    </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
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