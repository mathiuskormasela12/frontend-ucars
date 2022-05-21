// ========== Services
// import all modules
import http from './http';
import {
  IGetAllCars,
  ILoginRegisterBody,
} from '../interfaces';

class Service {
  public static login(data: ILoginRegisterBody) {
    return http().post('/auth/login', data);
  }

  public static register(data: ILoginRegisterBody) {
    return http().post('/auth/register', data);
  }

  public static getAllCars(data: IGetAllCars) {
    return http().get(`/cars/brand?${Object.keys(data).map((item, index) => `${item}=${Object.values(data)[index]}`).join('&')}`);
  }

  public static getCar(id: string) {
    return http().get(`/cars/brand/${id}`);
  }

  public static getAllCarModels() {
    return http().get('/cars/model?page=1&limit=0');
  }

  public static updateCar(id:string, data: FormData) {
    return http().put(`/cars/brand/${id}`, data);
  }

  public static addCar(data: FormData) {
    return http().post('/cars/brand', data);
  }

  public static deleteCar(id:string) {
    return http().delete(`/cars/brand/${id}`);
  }
}

export default Service;
