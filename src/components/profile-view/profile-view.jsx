import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, Form, FormControl, Container, Col, Row, Button } from 'react-bootstrap';
import './profile-view.scss';

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
        this.removeFav = this.removeFav.bind(this);
        this.setUsername = this.setUsername.bind(this);
    }

    //GETS user information
    getUser(token) {
        let user = localStorage.getItem('user');
        axios.get('https://powerful-coast-48240.herokuapp.com/users/${user}', {
            headers: { Authorization:`Bearer ${token}`},
        })
        .then((response) => {
            // Assigns result to the state
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
}