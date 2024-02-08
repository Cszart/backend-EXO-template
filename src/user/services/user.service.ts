import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';
import { HttpResponse } from 'src/httpResponse/utils/httpResponse.util';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { transformUserEntityToUserDTO } from '../utils/user.utils';
import { UserDTO } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  // --- CRUD functions --- //

  // Create
  async createUser(userData: UserDTO): Promise<HttpResponseI<UserDTO>> {
    const newUser = new UserEntity();

    // Append every key received
    Object.keys(userData).forEach(key => {
      newUser[key] = userData[key];
    });

    // Save to Database
    const savedUser = await this.usersRepository.save(newUser);

    return HttpResponse(HttpStatus.CREATED, 'User created successfully', transformUserEntityToUserDTO(savedUser));
  }

  // Find all
  async findAllUsers(): Promise<HttpResponseI<UserDTO[]>> {
    const usersData = await this.usersRepository.find({ order: { id: 'DESC' } });

    const usersResponse: UserDTO[] = usersData.map((user: UserEntity) => transformUserEntityToUserDTO(user));

    return HttpResponse(HttpStatus.OK, 'All users fetched successfully', usersResponse);
  }

  // Find one
  async findOneUser(id: number): Promise<HttpResponseI<UserDTO>> {
    try {
      const user = await this.usersRepository.findOne({ where: { id: id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return HttpResponse(HttpStatus.OK, 'User fetched successfully', transformUserEntityToUserDTO(user));
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  // Update
  async updateUser(id: number, updatedUserData: Partial<UserDTO>): Promise<HttpResponseI<UserDTO>> {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updatedUserData);
    const updatedUser = await this.usersRepository.save(user);
    return HttpResponse(HttpStatus.OK, 'User updated successfully', transformUserEntityToUserDTO(updatedUser));
  }

  // Delete
  async deleteUser(id: number): Promise<HttpResponseI<void>> {
    await this.usersRepository.delete(id);
    return HttpResponse(HttpStatus.OK, 'User deleted successfully', null);
  }
}
