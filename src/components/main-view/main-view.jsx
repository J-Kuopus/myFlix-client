import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

// Imports LoginView component
import { LoginView } from '../login-view/login-view';

// Imports RegistrationView component
import { RegistrationView } from '../registration-view/registration-view';

// Imports MovieCard component
import { MovieCard } from '../movie-card/movie-card';

// Imports MovieView component
import { MovieView } from '../movie-view/movie-view';

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

    componentDidMount(){
      axios.get('https://powerful-coast-48240.herokuapp.com/movies')
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    /* When a movie is clicked, this function is invoked and updates the state of the 
    'selectedMovie'--property to that movie*/
    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }

    // When a user sucessfully registers account
    onRegistration(register) {
      this.setState({
        register
      });
    }

    // When a user successfully logs in, this function updates the 'user' property in state to that particular user
    onLoggedIn(user) {
      this.setState({
        user
      });
    }

    render() {
      const { movies, selectedMovie, user, register } = this.state; // Deconstructed variables

      // If user isn't registered, return RegistrationView
      /*if (!register) 
      
      return (<RegistrationView onRegistration={(register) => 
        this.onRegistration(register)} />);*/

      /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are 
      passed as a prop to the LoginView */
      if (!user) 
      
      return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

      // Before the movies have been loaded
      if (movies.length === 0) 
      
      return <div className="main-view" />; 

      /* If the state of 'selectedMovie' is not null, that selected movie will be returned, otherwise, all 
      movies will be returned */
      return (
        <div className="main-view">
          {selectedMovie
            ? (
                <Row className="justify-content-md-center">
                  <Col md={8}>
                    <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {
                      this.setSelectedMovie(newSelectedMovie); }}
                    />
                  </Col>
                </Row>
             )
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={ (movie) => { // Display MovieCard data when movie is clicked
                this.setSelectedMovie(movie) }}
              />
            ))
          }
        </div>
      );
    }
}
                    
 export default MainView; // Defines MainView as the default view          

