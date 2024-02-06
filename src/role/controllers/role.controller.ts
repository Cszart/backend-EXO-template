import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleI } from '../models/role.interface';
import { DeleteResult } from 'typeorm';
import { RoleService } from '../services/role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAllRoles(): Promise<Observable<RoleI[]>> {
    return this.roleService.findAllRoles();
  }

  @Get(':id')
  findOneRole(@Param('id') id: number): Promise<Observable<RoleI>> {
    return this.roleService.findOneRole(id);
  }

  @Post()
  createRole(@Body() roleData: RoleI): Promise<Observable<RoleI>> {
    return this.roleService.createRole(roleData);
  }

  @Put(':id')
  updateRole(@Param('id') id: number, @Body() updatedRoleData: Partial<RoleI>): Promise<RoleI> {
    return this.roleService.updateRole(id, updatedRoleData);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: number): Promise<Observable<DeleteResult>> {
    return this.roleService.deleteRole(id);
  }
}
