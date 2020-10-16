import {HttpErrors} from '@loopback/rest';
  import {Credentials} from '../repositories/index';

  export function validateCredentials(credentials: Credentials) {
    if (credentials.password.length < 4) {
      throw new HttpErrors.UnprocessableEntity('password length should be greater than 4')
    }
  }