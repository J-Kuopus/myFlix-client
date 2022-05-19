import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

class MainView extends React.Component {

    constructor(){
        super();
        // Initial state is set to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    // GETS list of movies once the user is logged in
   getMovies(token) {
    axios.get('https://powerful-coast-48240.herokuapp.com/movies', {
      headers: { Authorization:`Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }


    componentDidMount() {
      // Persists authorization so user doesn't have to login again after refreshing page
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
      }
    }

    /* When a movie is clicked, this function is invoked and updates the state of the 
    'selectedMovie'--property to that movie*/
    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }

    // When a user successfully logs in, this function updates the 'user' property in state to that particular user
   onLoggedIn(authData) {
     console.log(authData);
     this.setState({
       user: authData.user.Username
     })

     localStorage.setItem('token', authData.token);
     localStorage.setItem('user', authData.user.Username);
     this.getMovies(authData.token);
   }

   onLoggedOut() {
     localStorage.removeItem('token');
     localStorage.removeItem('user');
     this.setState({
       user: null
     });
   }

    render() {
      const { movies, selectedMovie, user } = this.state; // Deconstructed variables
      
      /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are 
      passed as a prop to the LoginView */
      if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

      // Before the movies have been loaded
      if (movies.length === 0) return <div className="main-view" />; 

      /* If the state of 'selectedMovie' is not null, that selected movie will be returned, otherwise, all 
      movies will be returned */
      return (
        <Router>
        <Row className="main-view justify-content-md-center" xs={1} md={3} lg={4}>
          {selectedMovie
            ? (
              <Col>
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {
                    this.setSelectedMovie(newSelectedMovie); }}
                  />
              </Col>
              )
            : movies.map(movie => (
              <Col className="movie-card-col" key={movie._id}>
                  <MovieCard movie={movie} onMovieClick={ (movie) => { // Display MovieCard data when movie is clicked
                    this.setSelectedMovie(movie); }}
                  />
              </Col>
              ))
          }
          <button onClick={() => { this.onLoggedOut() }}>Logout</button>
        </Row>
        </Router>
        );
    }
}
                    
export default MainView; // Defines MainView as the default view          

