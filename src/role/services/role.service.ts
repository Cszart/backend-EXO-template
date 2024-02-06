import { Injectable, NotFoundException } from '@nestjs/common';

import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { catchError, from, map, Observable, of } from 'rxjs';

import { RoleEntity } from '../models/role.entity';
import { RoleI } from '../models/role.interface';
import { transformRoleEntityToRoleI } from '../utils/role.utils';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
  ) {}

  // --- CRUD functions --- //
  // Create
  async createRole(roleData: RoleI): Promise<Observable<RoleI>> {
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

    // Create a new RoleI object with converted Date properties
    const roleResponse: RoleI = {
      id: savedRole.id,
      uuid: savedRole.uuid,
      role: savedRole.role,
      createdAt: savedRole.createdAt.toISOString(), // Convert Date to string
      modifiedAt: savedRole.modifiedAt.toISOString(), // Convert Date to string
    };

    return of(roleResponse);
  }

  // Find all
  async findAllRoles(): Promise<Observable<RoleI[]>> {
    const rolesData = await this.rolesRepository.find({ order: { id: 'DESC' } });

    const rolesResponse: RoleI[] = rolesData.map((role: RoleEntity) => transformRoleEntityToRoleI(role));

    return of(rolesResponse);
  }

  // Find one
  async findOneRole(id: number): Promise<Observable<RoleI>> {
    try {
      return from(this.rolesRepository.findOne({ where: { id: id } })).pipe(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        catchError(error => {
          throw new NotFoundException('Could not find role');
        }),
        map((role: RoleEntity) => transformRoleEntityToRoleI(role)),
      );
    } catch (error) {
      throw new NotFoundException('Could not find role');
    }
  }

  // Update
  async updateRole(id: number, updatedRoleData: Partial<RoleI>): Promise<RoleI> {
    // Find the role by ID
    const role = await this.rolesRepository.findOne({ where: { id: id } });

    // Throw NotFoundException if the role with the given ID is not found
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // Update the role entity with the provided data
    Object.assign(role, updatedRoleData);

    // Save the updated role entity
    const updatedRole = await this.rolesRepository.save(role);

    // Transform and return the updated role entity as RoleI
    return transformRoleEntityToRoleI(updatedRole);
  }

  // Delete
  async deleteRole(id: number): Promise<Observable<DeleteResult>> {
    return from(this.rolesRepository.delete(id));
  }
}
