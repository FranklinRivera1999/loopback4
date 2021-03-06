import {Entity, hasMany, model, property} from '@loopback/repository';
import {Cube} from './cube.model';

@model()
export class Car extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
  })
  created?: string;

  @property({
    type: 'string',
  })
  plateNumber?: string;

  @property({
    type: 'string',
  })
  model?: string;

  @property({
    type: 'string',
  })
  brand?: string;

  @property({
    type: 'string',
  })
  color?: string;

  @property({
    type: 'string',
  })
  soat?: string;

  @property({
    type: 'number',
  })
  numberSeats?: number;

  @property({
    type: 'number',
  })
  yearProduction?: number;

  @property({
    type: 'number',
  })
  driverId?: number;

  @property({
    type: 'string',
  })
  postulantId?: string;

  @hasMany(() => Cube)
  cubes: Cube[]

  constructor(data?: Partial<Car>) {
    super(data);
  }
}

export interface CarRelations {
  // describe navigational properties here
}

export type CarWithRelations = Car & CarRelations;
