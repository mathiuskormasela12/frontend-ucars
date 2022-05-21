// ========== Home
// import all modules
import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  Image,
  Pagination,
  Button,
  Form,
  FormControl,
  Row,
  Col,
} from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { IGetAllCars } from '../interfaces';
import Service from '../service';
import { setToken } from '../redux/actions/auth';

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    cars: [],
    page: Number(searchParams.get('page') || 1),
    limit: Number(searchParams.get('limit') || 5),
    keywords: String(searchParams.get('keywords') || ''),
    message: '',
    totalPages: 0,
    refresh: false,
  });

  const getAllCars = async () => {
    const query: IGetAllCars = {
      page: state.page,
      limit: state.limit,
      keywords: state.keywords,
    };

    try {
      const { data } = await Service.getAllCars(query);
      setState((currentState) => ({
        ...currentState,
        cars: data.results,
        message: '',
        totalPages: data.pageInfo.totalPages,
      }));
    } catch (err: any) {
      setState((currentState) => ({
        ...currentState,
        cars: [],
        totalPages: 0,
        message: err
				&& err.response
				&& err.response.data
				&& err.response.data.message
          ? err.response.data.message
          : err && err.message
            ? err.message
            : 'Server Error',
      }));
    }
  };

  const deleteCar = async (id: string) => {
    try {
      const { data } = await Service.deleteCar(id);
      setState((currentState) => ({
        ...currentState,
        message: data.message,
        refresh: !currentState.refresh,
      }));
    } catch (err: any) {
      setState((currentState) => ({
        ...currentState,
        message: err
				&& err.response
				&& err.response.data
				&& err.response.data.message
          ? err.response.data.message
          : err && err.message
            ? err.message
            : 'Server Error',
      }));
    }
  };

  const showDeleteAlert = (id: string) => {
    Swal.fire({
      title: 'Are you sure to delete this car?',
      showCancelButton: true,
      icon: 'question',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCar(id);
      }
    });
  };

  useEffect(() => {
    getAllCars();
  }, [state.page, state.keywords, state.refresh]);

  const handleNextPage = (page: number) => {
    // navigate(`/?page=${String(page)}`);
    setSearchParams({
      page: String(page),
    });
    setState((currentState) => ({
      ...currentState,
      page,
    }));
  };

  const handleInput = (e: any) => {
    setSearchParams({
      keywords: e.target.value,
    });
    setState((currentState) => ({
      ...currentState,
      keywords: e.target.value,
    }));
  };

  const handleLogout = () => {
    dispatch(setToken('', ''));
    navigate('/auth/login');
  };

  const goTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="py-5">
      <Container>
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
        <h1 className="display-4 mb-4">Home</h1>
        <Row className="mb-4">
          <Col md={3}>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleInput}
              />
            </Form>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Car Model</th>
              <th>Logo</th>
              <th>Year</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state.cars.map((item: any) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.carModel}</td>
                <td>
                  <Image crossOrigin="anonymous" src={item.logo} alt={item.name} fluid width={120} height={120} />
                </td>
                <td>{item.year}</td>
                <td>
                  {item.description.slice(0, 10).concat('...')}
                </td>
                <td>
                  <Button variant="primary" onClick={() => goTo(`/${item._id}`)}>Detail</Button>
                  <Button variant="danger" onClick={() => showDeleteAlert(item._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button variant="dark" onClick={() => goTo('/car/add')}>Add Car</Button>
        <br />
        <br />

        <Pagination>
          {[...Array(state.totalPages)].map(((item, index) => (
            <Pagination.Item
              key={index.toString()}
              active={state.page === (index + 1)}
              onClick={() => handleNextPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )))}
        </Pagination>
      </Container>

    </div>
  );
};

export default Home;
