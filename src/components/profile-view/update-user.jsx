import React from 'react';
import { Form } from 'react-bootstrap';

function UpdateUser({ handleSubmit, handleUpdate }) {
    return (
        <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
            <h2>Change your profile info here.</h2>
            <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text"
                              name="Username"
                              defaultValue={user.Username}
                              onChange={e => handleUpdate(e)} 
                />

            </Form.Group>

            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password"
                              name="password"
                              defaultValue={user.Password}
                              onChange={e => handleUpdate(e)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email"
                              name="email"
                              defaultValue={user.Email}
                              onChange={e => handleUpdate(e)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Birthdate:</Form.Label>
                <Form.Control type="date"
                              name="birthdate"
                              defaultValue={user.Birthday}
                              onChange={e => handleUpdate(e)} />
            </Form.Group>
        </Form>
    )
}

export default UpdateUser;