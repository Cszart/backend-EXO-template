import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';
import { UserI } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUsers(): Promise<HttpResponseI<UserI[]>> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findOneUser(@Param('id') id: number): Promise<HttpResponseI<UserI>> {
    return this.userService.findOneUser(id);
  }

  @Post()
  createUser(@Body() userData: UserI): Promise<HttpResponseI<UserI>> {
    return this.userService.createUser(userData);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() updatedUserData: Partial<UserI>): Promise<HttpResponseI<UserI>> {
    return this.userService.updateUser(id, updatedUserData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<HttpResponseI<void>> {
    return this.userService.deleteUser(id);
  }
}
