import { Injectable, NotFoundException } from '@nestjs/common';

import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { catchError, from, map, Observable, of } from 'rxjs';

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
  async createPermission(permissionData: PermissionI): Promise<Observable<PermissionI>> {
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

    return of(transformPermissionEntityToPermissionI(savedPermission));
  }

  // Find all
  async findAllPermissions(): Promise<Observable<PermissionI[]>> {
    const permissionsData = await this.permissionsRepository.find({ order: { id: 'DESC' } });

    const permissionsResponse: PermissionI[] = permissionsData.map((permission: PermissionEntity) =>
      transformPermissionEntityToPermissionI(permission),
    );

    return of(permissionsResponse);
  }

  // Find one
  async findOnePermission(id: number): Promise<Observable<PermissionI>> {
    try {
      return from(this.permissionsRepository.findOne({ where: { id: id } })).pipe(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        catchError(error => {
          throw new NotFoundException('Could not find permission');
        }),
        map((permission: PermissionEntity) => transformPermissionEntityToPermissionI(permission)),
      );
    } catch (error) {
      throw new NotFoundException('Could not find permission');
    }
  }

  // Update
  async updatePermission(id: number, updatedPermissionData: Partial<PermissionI>): Promise<PermissionI> {
    // Find the permission by ID
    const permission = await this.permissionsRepository.findOne({ where: { id: id } });

    // Throw NotFoundException if the permission with the given ID is not found
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    // Update the permission entity with the provided data
    Object.assign(permission, updatedPermissionData);

    // Save the updated permission entity
    const updatedPermission = await this.permissionsRepository.save(permission);

    // Transform and return the updated permission entity as PermissionI
    return transformPermissionEntityToPermissionI(updatedPermission);
  }

  // Delete
  async deletePermission(id: number): Promise<Observable<DeleteResult>> {
    return from(this.permissionsRepository.delete(id));
  }
}
