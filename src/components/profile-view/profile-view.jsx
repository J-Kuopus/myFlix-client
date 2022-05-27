import React from 'react';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile-view.scss';
import axios from 'axios';

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: [],
        };
    };

    getUser(token) {
        let user = localStorage.getItem("user");
        axios.get(`https://powerful-coast-48240.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            //assign the result to the state
            this.setState({
              username: response.data.username,
              password: response.data.password,
              email: response.data.email,
              birthday: response.data.birthday,
              favoriteMovies: response.data.favoriteMovies,
            });
          })
          .catch((e) => console.log(e));
      }

      componentDidMount() {
        const accessToken = localStorage.getItem("token");
        this.getUser(accessToken);
      };

      render() {
          const { username, password, email, birthday, favoriteMovies } = this.state;
          const { onBackClick } = this.props;
    
      return (
        <Container>
            <Card>
              <Card.Body>
              <Card.Header>
                <Button
                  variant="danger"
                  type="submit"
                  onClick={() => {
                    onBackClick();
                  }}>Back
                </Button>
                </Card.Header>
                <Card.Text><span className="label">Username: </span>{username}</Card.Text>
                <Card.Text><span className="label">Password: </span>{password}</Card.Text>
                <Card.Text><span className="label">Email: </span>{email}</Card.Text>
                <Card.Text><span className="label">Birthday: </span>{birthday}</Card.Text>
                <Card.Text><span className="label">Favorite Movies: </span>{favoriteMovies}</Card.Text>
                </Card.Body>
            </Card>
        </Container>
        );
    };

}

