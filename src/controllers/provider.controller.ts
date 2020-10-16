import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {inject} from '@loopback/core';
import {
  del, get,
  getModelSchemaRef, param,
  patch, post,
  put,
  requestBody,
  HttpErrors
} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {loginProviderSchema} from '../schemas/provider.schema';
import {loginService} from '../services/login.service';
import {JWTService} from '../authServices/jwt.service'
import {MyUserService} from '../authServices/user.service';
import { TokenServiceBindings, UserServiceBindings} from '../keys';

export class ProviderController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,

    // @inject(UserServiceBindings.USER_SERVICE)
    @inject('service.user.service')
    public userService: MyUserService,

    // @inject('service.jwt.service')
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
  ) {}

  @post('/api/provider/login', {
    responses: {
      '200': {
        description: 'User with AccessToken'
      },
    },
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(loginProviderSchema),
        },
      },
    })
    user: loginProviderSchema,
  ):Promise<any> {
    let response = await loginService(user.username, user.password)
    if( !response) throw new HttpErrors[400]('Error en el Login')
    response.role = 'PROVIDER'
    let userFound = await this.userRepository.findOne({
      where:{
        username: response.username
      }
    })

    if(!userFound){
      userFound = await this.userRepository.create(response)
    }else{
      await this.userRepository.update(userFound, response)
    }

    let userProfile = await this.userService.convertToUserProfile(userFound)
    let accessToken = await this.jwtService.generateToken(userProfile)
    return {
      user:userProfile
    }

  }

  @get('/api-users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/api-users', {
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/api-users/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/api-users/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/api-users/{id}', {
    responses: {
      '204': {
        description: 'User PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/api-users/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
