import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { RoleEntity } from '../models/role.entity';
import { RoleI } from '../models/role.interface';
import { transformRoleEntityToRoleI } from '../utils/role.utils';

import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';
import { HttpResponse } from 'src/httpResponse/utils/httpResponse.util';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
  ) {}

  // --- CRUD functions --- //

  // Create
  async createRole(roleData: RoleI): Promise<HttpResponseI<RoleI>> {
    const newRole = new RoleEntity();

    // Append every key received
    Object.keys(roleData).forEach(key => {
      if (key === 'createdAt' || key === 'modifiedAt') {
        newRole[key] = new Date(roleData[key]); // Convert string to Date object
      } else {
        newRole[key] = roleData[key];
      }
    });

    // Save to Database
    const savedRole = await this.rolesRepository.save(newRole);
    const transformedRole = transformRoleEntityToRoleI(savedRole);

    return HttpResponse(HttpStatus.CREATED, 'Role created successfully', transformedRole);
  }

  // Find all
  async findAllRoles(): Promise<HttpResponseI<RoleI[]>> {
    const rolesData = await this.rolesRepository.find({ order: { id: 'DESC' } });

    const rolesResponse: RoleI[] = rolesData.map((role: RoleEntity) => transformRoleEntityToRoleI(role));

    return HttpResponse(HttpStatus.OK, 'All roles fetched successfully', rolesResponse);
  }

  // Find one
  async findOneRole(id: number): Promise<HttpResponseI<RoleI>> {
    try {
      const role = await this.rolesRepository.findOne({ where: { id: id } });
      if (!role) {
        throw new NotFoundException('Role not found');
      }
      const transformedRole = transformRoleEntityToRoleI(role);
      return HttpResponse(HttpStatus.OK, 'Role fetched successfully', transformedRole);
    } catch (error) {
      throw new NotFoundException('Role not found');
    }
  }

  // Update
  async updateRole(id: number, updatedRoleData: Partial<RoleI>): Promise<HttpResponseI<RoleI>> {
    const role = await this.rolesRepository.findOne({ where: { id: id } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    Object.assign(role, updatedRoleData);
    const updatedRole = await this.rolesRepository.save(role);
    const transformedRole = transformRoleEntityToRoleI(updatedRole);
    return HttpResponse(HttpStatus.OK, 'Role updated successfully', transformedRole);
  }

  // Delete
  async deleteRole(id: number): Promise<HttpResponseI<void>> {
    await this.rolesRepository.delete(id);
    return HttpResponse(HttpStatus.OK, 'Role deleted successfully', null);
  }
}
