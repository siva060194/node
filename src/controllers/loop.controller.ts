import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Loop} from '../models';
import {LoopRepository} from '../repositories';

export class LoopController {
  constructor(
    @repository(LoopRepository)
    public loopRepository : LoopRepository,
  ) {}

  @post('/loops')
  @response(200, {
    description: 'Loop model instance',
    content: {'application/json': {schema: getModelSchemaRef(Loop)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Loop, {
            title: 'NewLoop',
            exclude: ['id'],
          }),
        },
      },
    })
    loop: Omit<Loop, 'id'>,
  ): Promise<Loop> {
    return this.loopRepository.create(loop);
  }

  @get('/loops/count')
  @response(200, {
    description: 'Loop model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Loop) where?: Where<Loop>,
  ): Promise<Count> {
    return this.loopRepository.count(where);
  }

  @get('/loops')
  @response(200, {
    description: 'Array of Loop model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Loop, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Loop) filter?: Filter<Loop>,
  ): Promise<Loop[]> {
    return this.loopRepository.find(filter);
  }

  @patch('/loops')
  @response(200, {
    description: 'Loop PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Loop, {partial: true}),
        },
      },
    })
    loop: Loop,
    @param.where(Loop) where?: Where<Loop>,
  ): Promise<Count> {
    return this.loopRepository.updateAll(loop, where);
  }

  @get('/loops/{id}')
  @response(200, {
    description: 'Loop model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Loop, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Loop, {exclude: 'where'}) filter?: FilterExcludingWhere<Loop>
  ): Promise<Loop> {
    return this.loopRepository.findById(id, filter);
  }

  @patch('/loops/{id}')
  @response(204, {
    description: 'Loop PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Loop, {partial: true}),
        },
      },
    })
    loop: Loop,
  ): Promise<void> {
    await this.loopRepository.updateById(id, loop);
  }

  @put('/loops/{id}')
  @response(204, {
    description: 'Loop PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() loop: Loop,
  ): Promise<void> {
    await this.loopRepository.replaceById(id, loop);
  }

  @del('/loops/{id}')
  @response(204, {
    description: 'Loop DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.loopRepository.deleteById(id);
  }
}
