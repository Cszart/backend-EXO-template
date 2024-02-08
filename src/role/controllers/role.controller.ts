import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';
import { RoleService } from '../services/role.service';
import { RoleDTO } from '../dtos/role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieved all roles successfully', type: [RoleDTO] })
  findAllRoles(): Promise<HttpResponseI<RoleDTO[]>> {
    return this.roleService.findAllRoles();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Retrieved role by ID successfully', type: RoleDTO })
  findOneRole(@Param('id') id: number): Promise<HttpResponseI<RoleDTO>> {
    return this.roleService.findOneRole(id);
  }

  @Post()
  @ApiBody({ type: RoleDTO, description: 'Role data' })
  @ApiResponse({ status: 201, description: 'Role created successfully', type: RoleDTO })
  createRole(@Body() roleData: RoleDTO): Promise<HttpResponseI<RoleDTO>> {
    return this.roleService.createRole(roleData);
  }

  @Put(':id')
  @ApiBody({ type: RoleDTO, description: 'Updated role data' })
  @ApiResponse({ status: 200, description: 'Role updated successfully', type: RoleDTO })
  updateRole(@Param('id') id: number, @Body() updatedRoleData: RoleDTO): Promise<HttpResponseI<RoleDTO>> {
    return this.roleService.updateRole(id, updatedRoleData);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Role deleted successfully' })
  deleteRole(@Param('id') id: number): Promise<HttpResponseI<void>> {
    return this.roleService.deleteRole(id);
  }
}
