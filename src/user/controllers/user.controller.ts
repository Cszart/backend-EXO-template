import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';
import { UserService } from '../services/user.service';
import { UserDTO } from '../dtos/user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieved all users successfully', type: [UserDTO] })
  findAllUsers(): Promise<HttpResponseI<UserDTO[]>> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Retrieved user by ID successfully', type: UserDTO })
  findOneUser(@Param('id') id: number): Promise<HttpResponseI<UserDTO>> {
    return this.userService.findOneUser(id);
  }

  @Post()
  @ApiBody({ type: UserDTO, description: 'User data' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: UserDTO })
  createUser(@Body() userData: UserDTO): Promise<HttpResponseI<UserDTO>> {
    return this.userService.createUser(userData);
  }

  @Put(':id')
  @ApiBody({ type: UserDTO, description: 'Updated user data' })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: UserDTO })
  updateUser(@Param('id') id: number, @Body() updatedUserData: UserDTO): Promise<HttpResponseI<UserDTO>> {
    return this.userService.updateUser(id, updatedUserData);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  deleteUser(@Param('id') id: number): Promise<HttpResponseI<void>> {
    return this.userService.deleteUser(id);
  }
}
