/* eslint-disable no-nested-ternary */
// ========== Register
// import all modules
import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ILoginRegisterBody } from '../interfaces';
import Service from '../service';

const Register: React.FC = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    loading: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Register';
  }, []);

  const handleInput = (name: string, e: any) => {
    setState((currentState) => ({
      ...currentState,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const body: ILoginRegisterBody = {
      username: state.username,
      password: state.password,
    };

    try {
      const { data } = await Service.register(body);
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: data.message,
        showCloseButton: true,
        didClose: () => {
          navigate('/auth/login');
        },
      });
    } catch (err: any) {
      Swal.fire({
        title: 'Failed',
        icon: 'warning',
        text: err
				&& err.response
				&& err.response.data
				&& err.response.data.message
          ? err.response.data.message
          : err && err.message
            ? err.message
            : 'Server Error',
      });
    }
  };

  return (
    <div className="d-flex align-items-center bg-danger vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col md={4}>
            <Card className="py-5">
              <Card.Title className="display-5 text-center">Register</Card.Title>
              <Card.Body>
                <Container>
                  <Form>
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control size="lg" type="text" placeholder="Type your username here..." value={state.username} onChange={(e) => handleInput('username', e)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control size="lg" type="password" placeholder="Type your password here..." value={state.password} onChange={(e) => handleInput('password', e)} />
                    </Form.Group>
                    <Button variant="primary" size="lg" className="w-100 mt-2" onClick={!state.loading ? handleSubmit : () => {}}>
                      {state.loading ? 'Loading...' : 'Register'}
                    </Button>
                  </Form>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
