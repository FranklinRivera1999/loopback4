import {belongsTo, Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Car} from './car.model';
import {Country} from './country.model';
import {Cube} from './cube.model';


@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  username?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'string',
  })
  role?: string;

  @property({
    type: 'string',
  })
  fbuid?: string;

  @property({
    type: 'string',
  })
  guid?: string;

  @property({
    type: 'string',
  })
  picture?: string;

  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'string',
  })
  names?: string;

  @property({
    type: 'string',
  })
  motherLastname?: string;

  @property({
    type: 'string',
  })
  lastname?: string;

  @belongsTo(() => Country)
  countryId?: string;

  @property({
    type: 'string',
  })
  documentType?: string;

  @property({
    type: 'string',
  })
  district?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  birthday?: string;

  @property({
    type: 'string',
  })
  licenseNumber?: string;

  @property({
    type: 'string',
  })
  issueDate?: string;

  @property({
    type: 'date',
  })
  dueDate?: string;

  @property({
    type: 'string',
  })
  facebook?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'number',
  })
  providerId: number;


  @hasOne(() => Car)
  car: Car

  @hasMany(() => Cube)
  cubes: Cube[]

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
