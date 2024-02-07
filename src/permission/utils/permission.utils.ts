// Updated transformPermissionEntityToPermissionI function
import { PermissionEntity } from '../models/permission.entity';
import { PermissionI } from '../models/permission.interface';

export function transformPermissionEntityToPermissionI(permissionEntity: PermissionEntity): PermissionI {
  return {
    id: permissionEntity.id,
    uuid: permissionEntity.uuid,
    category: permissionEntity.category,
    subCategory: permissionEntity.subCategory,
    permission: permissionEntity.permission,
    createdAt: permissionEntity.createdAt.toISOString(),
    modifiedAt: permissionEntity.modifiedAt.toISOString(),
  };
}
