import {DefaultCrudRepository} from '@loopback/repository';
import {Cube, CubeRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CubeRepository extends DefaultCrudRepository<
  Cube,
  typeof Cube.prototype.id,
  CubeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Cube, dataSource);
  }
}
