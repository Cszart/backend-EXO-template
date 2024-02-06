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
