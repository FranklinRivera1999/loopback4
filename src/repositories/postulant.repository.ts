import {DefaultCrudRepository} from '@loopback/repository';
import {Postulant, PostulantRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PostulantRepository extends DefaultCrudRepository<
  Postulant,
  typeof Postulant.prototype.id,
  PostulantRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Postulant, dataSource);
  }
}
