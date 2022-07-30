import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup, Container, Col, Row, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './movie-view.scss';

export class MovieView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            FavoriteMovies: [],
        }
    }

    getUser(token) {
        let user = localStorage.getItem('user');
        axios
          .get(`https://powerful-coast-48240.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            //assign the result to the state
            this.setState({
              FavoriteMovies: response.data.FavoriteMovies,
            });
          })
          .catch((e) => console.log(e));
      }
      componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
      }

    addFavMovie = () => {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        let userFavMovies = this.state.FavoriteMovies;
        let isFav = userFavMovies.includes(this.props.movie._id);
        if (!isFav) {
          axios.put(`https://powerful-coast-48240.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }).then((response) => {
              console.log(response.data);
              alert(
                `${this.props.movie.Title} has been added to your favorites!`
              );
              window.open(`/movies/${this.props.movie._id}`, "_self");
            })
            .catch(e => {
              console.log('Error')
            });
        } else if (isFav) {
          alert(
            `${this.props.movie.Title} is already on your favorites list!`
          );
        }
      }

      removeFavMovie = () => {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem("user");
        axios.delete(`https://powerful-coast-48240.herokuapp.com/users/${user}/movies/${this.props.movie._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }).then((response) => {
            console.log(response.data);
            alert(
              `${this.props.movie.Title} has been removed from favorites!`
            );
            window.open(`/movies/${this.props.movie._id}`, "_self");
          })
          .catch(e => {
            console.log('Error')
          });
      }


    render() {
        const { movie, onBackClick } = this.props;
        const { FavoriteMovies } = this.state;
        let userFavMovies = this.state.FavoriteMovies;
        let isFav = userFavMovies.includes(this.props.movie._id);

        return (
            <Container className="movie-view d-flex position-absolute top-50 start-50 translate-middle">
                <Row>
                    <Col xxl="8" xl="8" lg="6" md="4">
                    <div className="movie-info">
                        <ListGroup>
                            <ListGroup.Item className="movie-title">{movie.Title}</ListGroup.Item>
                            <ListGroup.Item className="movie-genre">
                                <span className="label">Genre: </span><Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link></ListGroup.Item>
                            <ListGroup.Item className="movie-director">
                                <span className="label">Director: </span><Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link></ListGroup.Item>
                            <ListGroup.Item className="release-year">
                                <span className="label">Released: </span>{movie.Released}</ListGroup.Item>
                            <ListGroup.Item><span className="label">Summary: </span>{movie.Description}</ListGroup.Item> 
                        </ListGroup>
                        {!isFav && (
                            <Button  variant="primary" onClick={this.addFavMovie}>Add to Favorites</Button>
                            )}
                        {isFav && (
                            <Button  variant="warning" onClick={this.removeFavMovie}>Remove from Favorites</Button>
                        )}
                    </div> 
                    </Col>
                    <Col xxl="4" xl="4" lg="6" md="4">
                    <div className="img-wrapper">
                        <img 
                            className="movie-poster d-block" 
                            src={movie.ImagePath}
                        />
                    </div>
                    </Col>
                    <div className="btn-wrapper">
                        <Button 
                            className="movie-button" 
                            variant="danger" 
                            onClick={() => { onBackClick(null); }}>Back to Main
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