import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Card, CardGroup } from 'react-bootstrap';
import axios from 'axios';


export function UpdateUserView(props) {
  const { user } = props;
  const [ username, setUsername] = useState('');
  const [ password, setPassword] = useState('');
  const [ email, setEmail] = useState('');
  const [ birthday, setBirthday] = useState('');
  const [ values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  // validate user inputs
  const validate =() => {
    let isReq = true;
    if (!username) {
      setValues({...values, usernameErr: 'Username required'});
      isReq = false;
    } else if (username.length < 5) {
      setValues({...values, usernameErr: 'Username must be at least 5 characters long'});
      isReq= false;
    }
    if (!password) {
      setValues({...values, passwordErr: 'Password required'});
      isReq = false;
    } else if (password.length < 6) {
      setValues({...values, passwordErr: 'Password must be at least 6 characters long'});
      isReq= false;
    }
    if (!email) {
      setValues({...values, emailErr: 'Email required'});
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({...values, emailErr: 'Enter valid email address'});
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      const token = localStorage.getItem('token');
      axios.put(`https://powerful-coast-48240.herokuapp.com/users/${user.Username}`, {
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
        window.open('/users/:Username', '_self');
      })
      .catch(error => {
        console.error(error);
        alert('Unable to update profile.');
      });
    }
  };

  return (
    <Container>
      <Card>
          <Card.Text>Edit profile info</Card.Text>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required/>
              {/* display validation error */}
              {values.usernameErr && <p>{values.usernameErr}</p>}
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                {/* display validation error */}
                {values.passwordErr && <p>{values.passwordErr}</p>}
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                {/* display validation error */}
                {values.emailErr && <p>{values.emailErr}</p>}
              </Form.Group>
              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBirthday" className="mt-3">
                <Button  variant="primary" type="submit" onClick={handleSubmit}>Edit profile</Button>
              </Form.Group>
          </Form>
      </Card>
    </Container>
  )
}
