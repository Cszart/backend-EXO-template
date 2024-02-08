import { RoleDTO } from '../dtos/role.dto';
import { RoleEntity } from '../models/role.entity';
import { RoleI } from '../models/role.interface';

export function transformRoleEntityToRoleI(roleEntity: RoleEntity): RoleI {
  return {
    id: roleEntity.id,
    uuid: roleEntity.uuid,
    role: roleEntity.role,
    createdAt: roleEntity.createdAt.toISOString(),
    modifiedAt: roleEntity.modifiedAt.toISOString(),
  };
}

export function transformRoleEntityToRoleDTO(roleEntity: RoleEntity): RoleDTO {
  const roleDTO = new RoleDTO();
  roleDTO.uuid = roleEntity.uuid;
  roleDTO.role = roleEntity.role;
  roleDTO.createdAt = roleEntity.createdAt.toISOString();
  roleDTO.modifiedAt = roleEntity.modifiedAt.toISOString();
  return roleDTO;
}
