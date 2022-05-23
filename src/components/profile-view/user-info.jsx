import React from 'react';
import { Card } from 'react-bootstrap';

function UserInfo({ username, password, email, birthday }) {
    return (
        <Container>
            <Card>
                <Card.Text>Username: {username}</Card.Text>
                <Card.Text>Password: {password}</Card.Text>
                <Card.Text>Email: {email}</Card.Text>
                <Card.Text>Birthday: {birthday}</Card.Text>
            </Card>
        </Container>
    )
};

export default UserInfo;