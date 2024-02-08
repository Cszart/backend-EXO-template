import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';
import { HttpResponse } from 'src/httpResponse/utils/httpResponse.util';

import { UserEntity } from 'src/user/models/user.entity';
import { UserDTO } from 'src/user/dtos/user.dto';
import { transformUserEntityToUserDTO } from 'src/user/utils/user.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async loginUser(email: string): Promise<HttpResponseI<UserDTO>> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      return HttpResponse(HttpStatus.OK, 'Login successful', transformUserEntityToUserDTO(user));
    } else {
      throw new NotFoundException('User not found');
    }
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async loginWallet(address: string): Promise<HttpResponseI<UserDTO>> {
    return HttpResponse(HttpStatus.OK, 'Login with wallet succesfull', {
      id: 789,
      email: 'admin@example.com',
      username: 'admin789',
      name: 'Admin User',
      image: 'https://cdn.shopify.com/s/files/1/0375/3020/6345/t/47/assets/image5-1703599638358.png?v=1703599639',
      roles: ['admin'],
      permissions: [
        'user:management:view',
        'user:management:create',
        'user:management:edit',
        'user:management:delete',
        'role:management:view',
        'role:management:create',
        'role:management:edit',
        'role:management:delete',
        'permission:management:view',
        'permission:management:create',
        'permission:management:edit',
        'permission:management:delete',
      ],
      accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3Mi...Ix-E',
    });
  }

  async signUpUser(userData: UserDTO): Promise<HttpResponseI<UserDTO>> {
    const newUser = this.usersRepository.create(userData);
    const savedUser = await this.usersRepository.save(newUser);
    return HttpResponse(HttpStatus.CREATED, 'User created successfully', transformUserEntityToUserDTO(savedUser));
  }
}
