import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Loop, LoopRelations} from '../models';

export class LoopRepository extends DefaultCrudRepository<
  Loop,
  typeof Loop.prototype.id,
  LoopRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Loop, dataSource);
  }
}
