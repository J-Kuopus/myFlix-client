import React from 'react';
import axios from 'axios';
import { Form, Button, Card, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './registration-view.scss';
import { Formik } from 'formik';
import * as yup from 'yup';


export function RegistrationView() {
    
    return (
    
    <Container>
        <Formik
          validationSchema={yup.object({
            username: yup.string()
            .min(5, 'Must be at least 5 characters')
            .required('Required'),
            password: yup.string()
            .min(6, 'Must be at least 6 characters')
            .required('Required'),
            email: yup.string().email('Invalid email').required('Required'),
            birthday: yup.string(),
          })}

          onSubmit={(values, { resetForm }) => {
            resetForm();
            axios.post('https://powerful-coast-48240.herokuapp.com/users', {
                Username: values.username,
                Password: values.password,
                Email: values.email,
                Birthday: values.birthday
              })
              .then(response => {
                const data = response.data;
                alert('Registration successful, please login!');
                window.open('/', '_self'); // '_self is needed so the page will open in current tab
                })
                .catch(response => {
                    console.error(response);
                    alert('Unable to register');
                });
          }}
          
          initialValues={{
            username: "",
            password: "",
            email: "",
            birthday: ""
          }}
          >
            {({
                handleSubmit,
                handleChange,
                resetForm,
                touched,
                values,
                errors,
            }) => (
                <Container className="registration-view">
                <Row className="justify-content-center">
                <Col xxl={8} xl={8} lg={9} md={10} sm={12}>
                    <Card className="reg-card">
                        <Card.Body>
                        <h1>Register a new account</h1>
                        <Card.Header className="reg-header">Please enter the following information:</Card.Header>
                        <Form className="reg-form">

                            <Form.Group className="reg-input">
                              <Form.Label>Username: </Form.Label>
                                <Form.Control
                                  type="text" 
                                  value={values.username} 
                                  onChange={handleChange("username")}
                                  placeholder="Enter username"
                                  isInvalid={touched.username && !!errors.username}
                                />
                                <Form.Control.Feedback type="invalid">
                                {errors.username}
                              </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group className="reg-input">
                              <Form.Label>Password: </Form.Label>
                                <Form.Control 
                                  type="password" 
                                  value={values.password} 
                                  onChange={handleChange("password")}
                                  placeholder="Enter password"
                                  isInvalid={touched.password && !!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group className="reg-input">
                            <Form.Label>Email: </Form.Label>
                            <Form.Control 
                                type="email" 
                                value={values.email} 
                                onChange={handleChange("email")}
                                placeholder="Enter email"
                                isInvalid={touched.email && !!errors.email}
                            />
                            <Form.Text className="muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                            </Form.Group>
    
                            <Form.Group className="reg-input">
                            <Form.Label>Birthday: </Form.Label>
                            <Form.Control 
                                type="date" 
                                value={values.birthday} 
                                onChange={handleChange("birthday")} 
                                placeholder="Enter birthdate (optional)"
                            />
                            </Form.Group>
                            <Button variant="secondary" onClick={resetForm}>Clear</Button>{' '}
                            <Button variant="danger" onClick={handleSubmit}>Submit</Button>
                        </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Card.Text>Already registered? <Link to={'/'}>Sign in</Link> here</Card.Text>
                        </Card.Footer>
                    </Card>
                </Col>
                </Row>
            </Container>
            )}
          </Formik>
    </Container>
    );
}

