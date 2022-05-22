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
                        <Col>
                        <Card.Text>Title: </Card.Text>
                        <span>{genre.Name}</span>
                        </Col>
                        <Col>
                        <Card.Text>Description: </Card.Text>
                        <span>{genre.Description}</span>
                        </Col>
                    </Container>
                    <Container>
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
                    </Container>
                </Card.Body>
            </Card>
        );
    }
}