import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { RoleEntity } from '../models/role.entity';
import { RoleI } from '../models/role.interface';
import { transformRoleEntityToRoleDTO } from '../utils/role.utils';

import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';
import { HttpResponse } from 'src/httpResponse/utils/httpResponse.util';
import { RoleDTO } from '../dtos/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
  ) {}

  // --- CRUD functions --- //

  // Create
  async createRole(roleData: RoleDTO): Promise<HttpResponseI<RoleDTO>> {
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
    const transformedRole = transformRoleEntityToRoleDTO(savedRole);

    return HttpResponse(HttpStatus.CREATED, 'Role created successfully', transformedRole);
  }

  // Find all
  async findAllRoles(): Promise<HttpResponseI<RoleDTO[]>> {
    const rolesData = await this.rolesRepository.find({ order: { id: 'DESC' } });

    const rolesResponse: RoleDTO[] = rolesData.map((role: RoleEntity) => transformRoleEntityToRoleDTO(role));

    return HttpResponse(HttpStatus.OK, 'All roles fetched successfully', rolesResponse);
  }

  // Find one
  async findOneRole(id: number): Promise<HttpResponseI<RoleDTO>> {
    try {
      const role = await this.rolesRepository.findOne({ where: { id: id } });
      if (!role) {
        throw new NotFoundException('Role not found');
      }
      const transformedRole = transformRoleEntityToRoleDTO(role);
      return HttpResponse(HttpStatus.OK, 'Role fetched successfully', transformedRole);
    } catch (error) {
      throw new NotFoundException('Role not found');
    }
  }

  // Update
  async updateRole(id: number, updatedRoleData: RoleDTO): Promise<HttpResponseI<RoleDTO>> {
    const role = await this.rolesRepository.findOne({ where: { id: id } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    Object.assign(role, updatedRoleData);
    const updatedRole = await this.rolesRepository.save(role);
    const transformedRole = transformRoleEntityToRoleDTO(updatedRole);
    return HttpResponse(HttpStatus.OK, 'Role updated successfully', transformedRole);
  }

  // Delete
  async deleteRole(id: number): Promise<HttpResponseI<void>> {
    await this.rolesRepository.delete(id);
    return HttpResponse(HttpStatus.OK, 'Role deleted successfully', null);
  }
}
