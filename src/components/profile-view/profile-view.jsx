import React from 'react';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile-view.scss';
import axios from 'axios';
import UserInfo from './user-info';
import UpdateUser from './update-user';
import FavoriteMovies from './favorite-movies';

export function ProfileView({ movies, onUpdatedUserInfo }) {
    const [user, setUser] = useState({});
    

    const favoriteMovieList = movies.filter((movies) => {});

    const getUser = () => {};

    const handleSubmit = (e) => {};

    const removeFav = (id) => {};

    const handleUpdate = (e) => {};

    return (
        <Container>
            <UserInfo name={user.Username} password={user.Password} email={user.Email} birthday={user.Birthday} />
            <FavoriteMovies favoriteMovieList={favoriteMovieList} />
            <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
        </Container>
    );

}

export default ProfileView;
