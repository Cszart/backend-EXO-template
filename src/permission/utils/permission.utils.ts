import { PermissionEntity } from '../models/permission.entity';
import { PermissionI } from '../models/permission.interface';

export function transformPermissionEntityToPermissionI(roleEntity: PermissionEntity): PermissionI {
  return {
    id: roleEntity.id,
    uuid: roleEntity.uuid,
    permission: roleEntity.permission,
    createdAt: roleEntity.createdAt.toISOString(),
    modifiedAt: roleEntity.modifiedAt.toISOString(),
  };
}
