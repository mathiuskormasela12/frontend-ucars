// =========== Add Car
// import all modules
import React, { useState, useEffect } from 'react';
import {
  Form,
  Container,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { generateFormData } from '../helpers';
import Service from '../service';

const AddCar: React.FC = () => {
  const [state, setState] = useState({
    name: '',
    year: '',
    description: '',
    logo: '',
    file: '',
    carModels: [],
    carModelId: '',
  });
  const navigate = useNavigate();

  const getCarModels = async () => {
    try {
      const { data } = await Service.getAllCarModels();
      setState((currentState) => ({
        ...currentState,
        carModels: data.results,
      }));
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

  const submitCar = async (e: any) => {
    e.preventDefault();
    const formData = generateFormData({
      name: state.name,
      year: state.year,
      description: state.description,
      carModelId: state.carModelId,
      logo: state.file,
    });
    try {
      const { data } = await Service.addCar(formData);
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: data.message,
        showCloseButton: true,
        didClose: () => {
          navigate('/');
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

  useEffect(() => {
    getCarModels();
  }, []);

  const handleInput = (name: string, e: any) => {
    setState((currentState) => ({
      ...currentState,
      [name]: e.target.value,
    }));
  };

  const handleInputFile = (e: any) => {
    setState((currentState) => ({
      ...currentState,
      file: e.target.files[0],
    }));
  };

  return (
    <div className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h1>Add Car</h1>
            <Form onSubmit={submitCar}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Type the car name" value={state.name} onChange={(e) => handleInput('name', e)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="year">
                <Form.Label>Year</Form.Label>
                <Form.Control type="number" placeholder="Type the car year" value={state.year} onChange={(e) => handleInput('year', e)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" placeholder="Type the description" value={state.description} onChange={(e) => handleInput('description', e)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="carModel">
                <Form.Label>Car Model</Form.Label>
                <Form.Select value={state.carModelId} onChange={(e) => handleInput('carModelId', e)}>
                  <option>Select Car Model</option>
                  {state.carModels.map((item: any) => (
                    <option key={item._id.toString()} value={item._id}>{item.modelName}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Logo</Form.Label>
                <Form.Control type="file" onChange={handleInputFile} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Create
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddCar;
