/* eslint-disable no-nested-ternary */
// ========== Login
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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ILoginRegisterBody } from '../interfaces';
import { setToken } from '../redux/actions/auth';
import Service from '../service';

const Login: React.FC = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    loading: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const { data } = await Service.login(body);
      dispatch(setToken(data.results.accessToken, data.results.refreshToken));
      navigate('/');
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
              <Card.Title className="display-5 text-center">Login</Card.Title>
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
                      {state.loading ? 'Loading...' : 'Login'}
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

export default Login;
