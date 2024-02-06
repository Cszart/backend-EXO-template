import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserI } from '../models/user.interface';
import { UserService } from '../services/user.service';
import { DeleteResult } from 'typeorm';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUsers(): Promise<Observable<UserI[]>> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findOneUser(@Param('id') id: number): Promise<Observable<UserI>> {
    return this.userService.findOneUser(id);
  }

  @Post()
  createUser(@Body() userData: UserI): Promise<Observable<UserI>> {
    return this.userService.createUser(userData);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() updatedUserData: Partial<UserI>): Promise<UserI> {
    return this.userService.updateUser(id, updatedUserData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<Observable<DeleteResult>> {
    return this.userService.deleteUser(id);
  }
}
