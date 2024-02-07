import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';

import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';

import { RoleI } from '../models/role.interface';
import { RoleService } from '../services/role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAllRoles(): Promise<HttpResponseI<RoleI[]>> {
    return this.roleService.findAllRoles();
  }

  @Get(':id')
  findOneRole(@Param('id') id: number): Promise<HttpResponseI<RoleI>> {
    return this.roleService.findOneRole(id);
  }

  @Post()
  createRole(@Body() roleData: RoleI): Promise<HttpResponseI<RoleI>> {
    return this.roleService.createRole(roleData);
  }

  @Put(':id')
  updateRole(@Param('id') id: number, @Body() updatedRoleData: Partial<RoleI>): Promise<HttpResponseI<RoleI>> {
    return this.roleService.updateRole(id, updatedRoleData);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: number): Promise<HttpResponseI<void>> {
    return this.roleService.deleteRole(id);
  }
}
