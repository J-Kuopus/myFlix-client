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
        this.state = {
            movies: [],
            selectedMovie: null
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

    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }

    render() {
        const { movies, selectedMovie } = this.state; // Deconstructed variables

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

