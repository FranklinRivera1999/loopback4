import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Car} from './car.model';
import {Postulant} from './postulant.model';
import {User} from './user.model';

@model()
export class Cube extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
  })
  key?: string;

  @property({
    type: 'string',
  })
  url?: string;

  @belongsTo(() => Car)
  carId?: string;

  @belongsTo(() => User)
  driverId?: string;

  @belongsTo(() => Postulant)
  postulantId?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cube>) {
    super(data);
  }
}

export interface CubeRelations {
  // describe navigational properties here
}

export type CubeWithRelations = Cube & CubeRelations;
