import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';
import { PermissionDTO } from '../dtos/permission.dto';
import { PermissionService } from '../services/permission.service';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieved all permissions successfully', type: [PermissionDTO] })
  findAllPermissions(): Promise<HttpResponseI<PermissionDTO[]>> {
    return this.permissionService.findAllPermissions();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Retrieved permission by ID successfully', type: PermissionDTO })
  findOnePermission(@Param('id') id: number): Promise<HttpResponseI<PermissionDTO>> {
    return this.permissionService.findOnePermission(id);
  }

  @Post()
  @ApiBody({ type: PermissionDTO, description: 'Permission data' })
  @ApiResponse({ status: 201, description: 'Permission created successfully', type: PermissionDTO })
  createPermission(@Body() permissionData: PermissionDTO): Promise<HttpResponseI<PermissionDTO>> {
    return this.permissionService.createPermission(permissionData);
  }

  @Put(':id')
  @ApiBody({ type: PermissionDTO, description: 'Updated permission data' })
  @ApiResponse({ status: 200, description: 'Permission updated successfully', type: PermissionDTO })
  updatePermission(
    @Param('id') id: number,
    @Body() updatedPermissionData: PermissionDTO,
  ): Promise<HttpResponseI<PermissionDTO>> {
    return this.permissionService.updatePermission(id, updatedPermissionData);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Permission deleted successfully' })
  deletePermission(@Param('id') id: number): Promise<HttpResponseI<void>> {
    return this.permissionService.deletePermission(id);
  }
}
