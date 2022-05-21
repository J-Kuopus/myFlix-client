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
    
}