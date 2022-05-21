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
}

export default Service;
