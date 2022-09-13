import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile-view.scss';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';

export function ProfileView(props) {
  const [ user, setUser ] = useState(props.user);
  const [ movies, setMovies ] = useState(props.movies);
  const [ favoriteMovies, setFavoriteMovies ] = useState([]);
  const [ username, setUsername] = useState('');
  const [ password, setPassword] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday] = useState('');

   // Declare hook for each input
   const [ usernameErr, setUsernameErr ] = useState('');
   const [ passwordErr, setPasswordErr ] = useState('');
   const [ emailErr, setEmailErr ] = useState('');
  
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  // GETS user info
  const getUser = () => {
    axios.get(`https://powerful-coast-48240.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      setUser(response.data);
      setFavoriteMovies(response.data.FavoriteMovies)
    })
    .catch(error => console.error(error))
  }

  useEffect(() => {
    getUser();
  }, [])

  //DELETES user profile
  const handleDelete = () => {
    axios.delete(`https://powerful-coast-48240.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`The profile ${user.Username} was successfully deleted.`)
      localStorage.clear();
      window.open('/register', '_self');
    }).
    catch(error => console.error(error))
  }

  // Validate user inputs
    const validate = () => {
      let isReq = true;
      if(!username) {
          setUsernameErr('Username is required');
          isReq = false;
      } else if (username.length < 5) {
          setUsernameErr('Username must be at least 5 characters long')
          isReq = false;
      }
      if (!password) {
          setPasswordErr('Password is required, must be at least 6 characters long');
          isReq = false;
      } else if(password.length < 6){
          setPasswordErr('Password must be at least 6 characters long');
          isReq = false;
      }
      if (!email) {
        setEmailErr('Please enter email address');
          isReq = false;
      } else if(email.indexOf('@') === -1) {
          setEmail('Email must be a valid email address');
          isReq = false
      }

        return isReq;
    }

  // UPDATES user profile
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      const token = localStorage.getItem('token');
      axios.put(`https://powerful-coast-48240.herokuapp.com/users/${currentUser}`, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      },
      {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        console.log(response.data);
        alert('Profile was successfully updated!');
        localStorage.setItem('user', response.data.Username);
        window.open('/users/' + response.data.Username, '_self');
      })
      .catch(error => {
        console.error(error);
        alert('Unable to update profile.');
      });
    }
  };

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

  const renderFavourites = () => {
    if (movies.length + 0) {

      return (
        <Row className="justify-content-md-center">

          {favoriteMovies.length === 0 ? (<h5>Add some movies to your list</h5>) : (
            favoriteMovies.map((movieId, i) => (
              <Col md={6} lg={4} key={`${i}-${movieId}`} >
               <MovieCard movie={movies.find(m => m._id == movieId)} />
              </Col>
            ))
          )}

        </Row>
      )
    }
  }

    return (
        <Container>
          <Row>
            <Col>
              <Card className="profile-card">
                <Card.Body>

                  <Card.Title><span className="label">Profile Info</span></Card.Title>
                      <Card.Text><span className="label">Username: </span>{user.Username}</Card.Text>
                      <Card.Text><span className="label">Password: </span>******</Card.Text>
                      <Card.Text><span className="label">Email: </span>{user.Email}</Card.Text>
                      <Card.Text><span className="label">Birthday: </span>{user.Birthday}</Card.Text>

                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="profile-card">
                <Card.Body> 
                <Card.Title><span className="label">Edit profile info</span></Card.Title>
                  <Form>

                    <Form.Group controlId="formUsername">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required/>
                      {/* display validation error */}
                      {usernameErr && <p>{usernameErr}</p>} {/* Displays validation error */}
                      </Form.Group>

                      <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                        {/* display validation error */}
                        {passwordErr && <p>{passwordErr}</p>}
                      </Form.Group>

                      <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                        {/* display validation error */}
                        {emailErr && <p>{emailErr}</p>}
                      </Form.Group>

                      <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
                      </Form.Group>
                      <Form.Group controlId="formBirthday" className="mt-3">
                        <Button  variant="primary" type="submit" onClick={handleSubmit}>Edit profile</Button>
                      </Form.Group>

                  </Form>
                  </Card.Body>
                  <Button variant="secondary" onClick={handleDelete}>Delete profile</Button>
              </Card>
            </Col>
          </Row>
          <Row>
              <p></p>
              <p></p>
              <Card className="profile-card">
                <Card.Body>
              <Card.Title><span className="label">Favorite Movies</span></Card.Title>
              {renderFavourites()}
              </Card.Body>
              </Card>
          </Row>
        </Container>
      );
  };
