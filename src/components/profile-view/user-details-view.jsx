import React from 'react';
import axios from 'axios';
import { Form, FormGroup, FormControl, Container, Card, Row, Col } from 'react-bootstrap';
import PropTypes, { string } from "prop-types";

// Displays user info
export class UserDetailsView extends React.Component {
    constructor() {
        super();
    }
    getUser(token) {
        let user= localStorage.getItem('user');
        axios.get('https://powerful-coast-48240.herokuapp.com/users/${user}', {
            headers: { Authorization:`Bearer ${token}`},
        })
        .then((response) => {
            this.props.setUserData(responde.data);
        })
        .catch((e) => console.log(e))
    }
    


}