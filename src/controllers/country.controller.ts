import {authenticate, AuthenticationBindings} from '@loopback/authentication';
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
} from '@loopback/rest';
import {Country} from '../models';
import {CountryRepository} from '../repositories';

export class CountryController {
  constructor(
    @repository(CountryRepository)
    public countryRepository : CountryRepository,
  ) {}

  @authenticate("jwt")
  @post('/api/country', {
    responses: {
      '200': {
        description: 'Country model instance',
        content: {'application/json': {schema: getModelSchemaRef(Country)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Country, {
            title: 'NewCountry',
            exclude: ['id'],
          }),
        },
      },
    })
    country: Omit<Country, 'id'>,
  ): Promise<Country> {
    return this.countryRepository.create(country);
  }

  @authenticate("jwt")
  @get('/api/country', {
    responses: {
      '200': {
        description: 'Array of Country model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Country, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Country) filter?: Filter<Country>,
  ): Promise<Country[]> {
    return this.countryRepository.find(filter);
  }

  @authenticate("jwt")
  @get('/api/country/{id}', {
    responses: {
      '200': {
        description: 'Country model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Country, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Country, {exclude: 'where'}) filter?: FilterExcludingWhere<Country>
  ): Promise<Country> {
    return this.countryRepository.findById(id, filter);
  }

  @authenticate("jwt")
  @put('/api/country/{id}', {
    responses: {
      '204': {
        description: 'Country PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() country: Country,
  ): Promise<void> {
    await this.countryRepository.replaceById(id, country);
  }

  @authenticate("jwt")
  @del('/api/country/{id}', {
    responses: {
      '204': {
        description: 'Country DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.countryRepository.deleteById(id);
  }
}
