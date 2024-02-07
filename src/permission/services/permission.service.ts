import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';
import { HttpResponse } from 'src/httpResponse/utils/httpResponse.util';
import { Repository } from 'typeorm';
import { PermissionEntity } from '../models/permission.entity';
import { PermissionI } from '../models/permission.interface';
import { transformPermissionEntityToPermissionI } from '../utils/permission.utils';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionsRepository: Repository<PermissionEntity>,
  ) {}

  // --- CRUD functions --- //

  // Create
  async createPermission(permissionData: PermissionI): Promise<HttpResponseI<PermissionI>> {
    const newPermission = new PermissionEntity();

    // Append every key received
    Object.keys(permissionData).forEach(key => {
      if (key === 'createdAt' || key === 'modifiedAt') {
        newPermission[key] = new Date(permissionData[key]); // Convert string to Date object
      } else {
        newPermission[key] = permissionData[key];
      }
    });

    // Save to Database
    const savedPermission = await this.permissionsRepository.save(newPermission);

    return HttpResponse(
      HttpStatus.CREATED,
      'Permission created successfully',
      transformPermissionEntityToPermissionI(savedPermission),
    );
  }

  // Find all
  async findAllPermissions(): Promise<HttpResponseI<PermissionI[]>> {
    const permissionsData = await this.permissionsRepository.find({ order: { id: 'DESC' } });

    const permissionsResponse: PermissionI[] = permissionsData.map((permission: PermissionEntity) =>
      transformPermissionEntityToPermissionI(permission),
    );

    return HttpResponse(HttpStatus.OK, 'All permissions fetched successfully', permissionsResponse);
  }

  // Find one
  async findOnePermission(id: number): Promise<HttpResponseI<PermissionI>> {
    try {
      const permission = await this.permissionsRepository.findOne({ where: { id: id } });
      if (!permission) {
        throw new NotFoundException('Permission not found');
      }
      return HttpResponse(
        HttpStatus.OK,
        'Permission fetched successfully',
        transformPermissionEntityToPermissionI(permission),
      );
    } catch (error) {
      throw new NotFoundException('Permission not found');
    }
  }

  // Update
  async updatePermission(id: number, updatedPermissionData: Partial<PermissionI>): Promise<HttpResponseI<PermissionI>> {
    const permission = await this.permissionsRepository.findOne({ where: { id: id } });
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    Object.assign(permission, updatedPermissionData);
    const updatedPermission = await this.permissionsRepository.save(permission);
    return HttpResponse(
      HttpStatus.OK,
      'Permission updated successfully',
      transformPermissionEntityToPermissionI(updatedPermission),
    );
  }

  // Delete
  async deletePermission(id: number): Promise<HttpResponseI<void>> {
    await this.permissionsRepository.delete(id);
    return HttpResponse(HttpStatus.OK, 'Permission deleted successfully', null);
  }
}
