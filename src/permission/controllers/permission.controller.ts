import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';
import { PermissionI } from '../models/permission.interface';
import { PermissionService } from '../services/permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  findAllPermissions(): Promise<HttpResponseI<PermissionI[]>> {
    return this.permissionService.findAllPermissions();
  }

  @Get(':id')
  findOnePermission(@Param('id') id: number): Promise<HttpResponseI<PermissionI>> {
    return this.permissionService.findOnePermission(id);
  }

  @Post()
  createPermission(@Body() permissionData: PermissionI): Promise<HttpResponseI<PermissionI>> {
    return this.permissionService.createPermission(permissionData);
  }

  @Put(':id')
  updatePermission(
    @Param('id') id: number,
    @Body() updatedPermissionData: Partial<PermissionI>,
  ): Promise<HttpResponseI<PermissionI>> {
    return this.permissionService.updatePermission(id, updatedPermissionData);
  }

  @Delete(':id')
  deletePermission(@Param('id') id: number): Promise<HttpResponseI<void>> {
    return this.permissionService.deletePermission(id);
  }
}
