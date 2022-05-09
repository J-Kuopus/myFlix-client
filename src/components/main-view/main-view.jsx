import React from 'react';
import axios from 'axios';

// Imports LoginView component
import { LoginView } from '../login-view/login-view';

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
    /* When a movie is clicked, this function is invoked and updates the state of the 'selectedMovie--property to that movie*/

    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }

    // When a user successfully logs in, this function updates the 'user' property in state to that particular user
    
    onLoggedIn(user) {
      this.setState({
        user
      });
    }

    render() {
        const { movies, selectedMovie } = this.state; // Deconstructed variables

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are 
        passed as a prop to the LoginView */
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        /*if (selectedMovie) return <MovieView movie={selectedMovie} />;*/ // Returns MovieView of selected movie

        if (movies.length === 0) return <div className="main-view" />; // Display message if no movies are present

        return (
            <div className="main-view">
              {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {
                this.setSelectedMovie(newSelectedMovie); }}/>
                : movies.map(movie => (
                  <MovieCard key={movie._id} movie={movie} onMovieClick={ (movie) => { // Display MovieCard data when movie is clicked
                  this.setSelectedMovie(movie) }}/>
                ))
                  }
                </div>
            );
        }
    }
                    
 export default MainView; // Defines MainView as the default view          

