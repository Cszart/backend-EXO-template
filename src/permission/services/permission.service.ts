import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';
import { HttpResponse } from 'src/httpResponse/utils/httpResponse.util';
import { Repository } from 'typeorm';
import { PermissionEntity } from '../models/permission.entity';
import { PermissionDTO } from '../dtos/permission.dto';
import { transformPermissionEntityToPermissionDTO } from '../utils/permission.utils';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionsRepository: Repository<PermissionEntity>,
  ) {}

  // --- CRUD functions --- //

  // Create
  async createPermission(permissionData: PermissionDTO): Promise<HttpResponseI<PermissionDTO>> {
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
      transformPermissionEntityToPermissionDTO(savedPermission),
    );
  }

  // Find all
  async findAllPermissions(): Promise<HttpResponseI<PermissionDTO[]>> {
    const permissionsData = await this.permissionsRepository.find({ order: { id: 'DESC' } });
    const permissionsResponse: PermissionDTO[] = permissionsData.map((permission: PermissionEntity) =>
      transformPermissionEntityToPermissionDTO(permission),
    );
    return HttpResponse(HttpStatus.OK, 'All permissions fetched successfully', permissionsResponse);
  }

  // Find one
  async findOnePermission(id: number): Promise<HttpResponseI<PermissionDTO>> {
    try {
      const permission = await this.permissionsRepository.findOne({ where: { id: id } });
      if (!permission) {
        throw new NotFoundException('Permission not found');
      }
      return HttpResponse(
        HttpStatus.OK,
        'Permission fetched successfully',
        transformPermissionEntityToPermissionDTO(permission),
      );
    } catch (error) {
      throw new NotFoundException('Permission not found');
    }
  }

  // Update
  async updatePermission(id: number, updatedPermissionData: PermissionDTO): Promise<HttpResponseI<PermissionDTO>> {
    const permission = await this.permissionsRepository.findOne({ where: { id: id } });
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    Object.assign(permission, updatedPermissionData);
    const updatedPermission = await this.permissionsRepository.save(permission);
    return HttpResponse(
      HttpStatus.OK,
      'Permission updated successfully',
      transformPermissionEntityToPermissionDTO(updatedPermission),
    );
  }

  // Delete
  async deletePermission(id: number): Promise<HttpResponseI<void>> {
    await this.permissionsRepository.delete(id);
    return HttpResponse(HttpStatus.OK, 'Permission deleted successfully', null);
  }
}
