import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {PasswordHasherBindings} from '../keys';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories/user.repository';
import {BcryptHasher} from './hash.password';

export class MyUserService implements UserService<User, Credentials>{
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,

    //@inject('service.hasher')
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher

  ) {}
  async verifyCredentials(credentials: Credentials): Promise<any> {
    // implement this method
    const foundUser = await this.userRepository.findOne({
      where: {
        username: credentials.username
      }
    });
    if (!foundUser) {
      throw new HttpErrors.NotFound('user not found');
    }
    const passwordMatched = await this.hasher.comparePassword(credentials.password, foundUser.password || '')
    if (!passwordMatched)
      throw new HttpErrors.Unauthorized('password is not valid');
    return foundUser;
  }
  convertToUserProfile(user: User): any {
    user.password = ''
    return {
      [securityId]: user.id!.toString(),
      user
    };
    // throw new Error('Method not implemented.');
  }

}