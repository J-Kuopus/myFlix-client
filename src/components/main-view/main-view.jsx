import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

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
    const { movies, user } = this.state; // Deconstructed variables
      
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
          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col className="movie-card-col" key={m._id}>
                <MovieCard movie={m} />
              </Col> 
            ))
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col>
                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                  </Col>
          }} />
          <Route path="/directors/:name" render={({ match  }) =>{
            return <Col>
                    <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                </Col>
            }
          } />
           <Route path="/genres/:name" render={({ match  }) =>{
            return <Col>
                    <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
                </Col>
            }
          } />
          
          <button onClick={() => { this.onLoggedOut() }}>Logout</button>
        </Row>
      </Router>
    );
  }
}
                    
export default MainView; // Defines MainView as the default view          

