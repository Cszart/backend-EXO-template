import { Injectable, NotFoundException } from '@nestjs/common';

import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { catchError, from, map, Observable, of } from 'rxjs';

import { UserEntity } from '../models/user.entity';
import { UserI } from '../models/user.interface';
import { transformUserEntityToUserI } from '../utils/user.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  // --- CRUD functions --- //
  // Create
  async createUser(userData: UserI): Promise<Observable<UserI>> {
    const newUser = new UserEntity();

    // Append every key received
    Object.keys(userData).forEach(key => {
      newUser[key] = userData[key];
    });

    // Save to Database
    const savedUser = await this.usersRepository.save(newUser);

    return of(transformUserEntityToUserI(savedUser));
  }

  // Find all
  async findAllUsers(): Promise<Observable<UserI[]>> {
    const usersData = await this.usersRepository.find({ order: { id: 'DESC' } });

    const usersResponse: UserI[] = usersData.map((user: UserEntity) => transformUserEntityToUserI(user));

    return of(usersResponse);
  }

  // Find one
  async findOneUser(id: number): Promise<Observable<UserI>> {
    try {
      return from(this.usersRepository.findOne({ where: { id: id } })).pipe(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        catchError(error => {
          throw new NotFoundException('Could not find user');
        }),
        map((user: UserEntity) => transformUserEntityToUserI(user)),
      );
    } catch (error) {
      throw new NotFoundException('Could not find user');
    }
  }

  // Update
  async updateUser(id: number, updatedUserData: Partial<UserI>): Promise<UserI> {
    // Find the user by ID
    const user = await this.usersRepository.findOne({ where: { id: id } });

    // Throw NotFoundException if the user with the given ID is not found
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update the user entity with the provided data
    Object.assign(user, updatedUserData);

    // Save the updated user entity
    const updatedUser = await this.usersRepository.save(user);

    // Transform and return the updated user entity as UserI
    return transformUserEntityToUserI(updatedUser);
  }

  // Delete
  async deleteUser(id: number): Promise<Observable<DeleteResult>> {
    return from(this.usersRepository.delete(id));
  }
}
