// Updated transformPermissionEntityToPermissionI function
import { PermissionDTO } from '../dtos/permission.dto';
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

export function transformPermissionEntityToPermissionDTO(permissionEntity: PermissionEntity): PermissionDTO {
  const permissionDTO = new PermissionDTO();
  permissionDTO.uuid = permissionEntity.uuid;
  permissionDTO.category = permissionEntity.category;
  permissionDTO.subCategory = permissionEntity.subCategory;
  permissionDTO.permission = permissionEntity.permission;
  permissionDTO.createdAt = permissionEntity.createdAt.toISOString();
  permissionDTO.modifiedAt = permissionEntity.modifiedAt.toISOString();
  return permissionDTO;
}
