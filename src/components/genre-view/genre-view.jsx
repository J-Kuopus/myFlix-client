import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Col, Row, ListGroup } from 'react-bootstrap';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import './genre-view.scss';

export class GenreView extends React.Component {
    render() {
        const { genre, movie, onBackClick } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        <Card className="genre-card">
                            <Card.Body>
                                <IoArrowBackCircleSharp className='back-arrow-genre' onClick={() => { onBackClick(); }}/> 
                                <p></p>
                                <ListGroup>
                                    <ListGroup.Item><span className="genre-label">{genre.Name} Genre</span></ListGroup.Item>
                                    <ListGroup.Item><span className="label">Description: </span></ListGroup.Item>
                                    <ListGroup.Item>{genre.Description}</ListGroup.Item>
                                </ListGroup>
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