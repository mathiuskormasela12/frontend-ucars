// ========== Services
// import all modules
import http from './http';
import {
  ILoginRegisterBody,
} from '../interfaces';

class Service {
  public static login(data: ILoginRegisterBody) {
    return http().post('/auth/login', data);
  }

  public static register(data: ILoginRegisterBody) {
    return http().post('/auth/register', data);
  }
}

export default Service;
