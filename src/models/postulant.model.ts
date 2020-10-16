import {belongsTo, Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Car} from './car.model';
import {Country} from './country.model';
import {Cube} from './cube.model';

@model()
export class Postulant extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  created: string;

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
  countryId: string;

  @property({
    type: 'string',
  })
  documentType?: string;

  @property({
    type: 'string',
  })
  documentNumber?: string;

  @property({
    type: 'string',
  })
  district?: string;

  @property({
    type: 'string',
  })
  direction?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'date',
    required: true,
  })
  birthday: string;

  @property({
    type: 'string',
  })
  licenseNumber?: string;

  @property({
    type: 'date',
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
    type: 'number',
    required: true,
  })
  providerId: number;

  @hasOne(() => Car)
  car: Car

  @hasMany(() => Cube)
  cubes: Cube[]

  constructor(data?: Partial<Postulant>) {
    super(data);
  }
}

export interface PostulantRelations {
  // describe navigational properties here
}

export type PostulantWithRelations = Postulant & PostulantRelations;
