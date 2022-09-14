import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, ListGroup } from 'react-bootstrap';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import './director-view.scss';

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick, movies } = this.props;

        return (
            <Card>
                <Card.Body>
                    <IoArrowBackCircleSharp className='back-arrow-director' onClick={() => { onBackClick(); }}/> 
                    <p></p>
                    <Container>
                        <ListGroup>
                            <ListGroup.Item><span className="director-label">Director Info</span></ListGroup.Item>
                            <ListGroup.Item><span className="label">Name: </span>{director.Name}</ListGroup.Item>
                            <ListGroup.Item><span className="label">Bio:  </span>{director.Bio}</ListGroup.Item>
                            <ListGroup.Item><span className="label">Birthyear: </span>{director.Birth}</ListGroup.Item>
                            <ListGroup.Item><span className="label">Deathyear: </span>{director.Death}</ListGroup.Item>
                        </ListGroup>
                    </Container>
                    <p></p>
                    <Container>
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