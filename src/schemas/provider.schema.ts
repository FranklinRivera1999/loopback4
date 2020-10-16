import {model, property} from '@loopback/repository';

@model()
export class loginProviderSchema {

  @property({
    type: 'string'
  })
  username: string;

  @property({
    type: 'string'
  })
  password: string;
}
