import {model, property} from '@loopback/repository';

@model()
export class cubeSchema {

  @property({
    type: 'string'
  })
  key: string;
}
