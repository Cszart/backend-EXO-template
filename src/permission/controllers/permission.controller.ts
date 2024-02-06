import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PermissionI } from '../models/permission.interface';
import { DeleteResult } from 'typeorm';
import { PermissionService } from '../services/permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  findAllPermissions(): Promise<Observable<PermissionI[]>> {
    return this.permissionService.findAllPermissions();
  }

  @Get(':id')
  findOnePermission(@Param('id') id: number): Promise<Observable<PermissionI>> {
    return this.permissionService.findOnePermission(id);
  }

  @Post()
  createPermission(@Body() permissionData: PermissionI): Promise<Observable<PermissionI>> {
    return this.permissionService.createPermission(permissionData);
  }

  @Put(':id')
  updatePermission(@Param('id') id: number, @Body() updatedPermissionData: Partial<PermissionI>): Promise<PermissionI> {
    return this.permissionService.updatePermission(id, updatedPermissionData);
  }

  @Delete(':id')
  deletePermission(@Param('id') id: number): Promise<Observable<DeleteResult>> {
    return this.permissionService.deletePermission(id);
  }
}
