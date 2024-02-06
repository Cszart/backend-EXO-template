import { UserEntity } from '../models/user.entity';
import { UserI } from '../models/user.interface';

export function transformUserEntityToUserI(userEntity: UserEntity): UserI {
  return {
    id: userEntity.id,
    email: userEntity.email,
    username: userEntity.username,
    name: userEntity.name,
    image: userEntity.image,
    roles: userEntity.roles,
    permissions: userEntity.permissions,
  };
}
