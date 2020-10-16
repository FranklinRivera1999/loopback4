
import {authenticate, AuthenticationBindings} from '@loopback/authentication';
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

import {UserProfile} from '@loopback/security';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spect';

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
      user:userProfile,
      accessToken
    }

  }

  @authenticate("jwt")
  @get('/users/me', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The current user profile',
      },
    },
  })
  async me(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: UserProfile,
  ): Promise<UserProfile> {
    return Promise.resolve(currentUser);
  }

}
