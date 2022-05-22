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

                    </Container>
                </Card.Body>
            </Card>
        )
    }
}