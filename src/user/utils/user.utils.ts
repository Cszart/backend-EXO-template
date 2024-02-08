import { UserDTO } from '../dtos/user.dto';
import { UserEntity } from '../models/user.entity';
import { UserI } from '../models/user.interface';

export function transformUserEntityToUserI(userEntity: UserEntity): UserI {
  return {
    id: userEntity.id,
    accessToken: userEntity.accessToken,
    email: userEntity.email,
    username: userEntity.username,
    name: userEntity.name,
    image: userEntity.image,
    roles: userEntity.roles,
    permissions: userEntity.permissions,
  };
}

export function transformUserEntityToUserDTO(userEntity: UserEntity): UserDTO {
  const userDTO = new UserDTO();
  userDTO.id = userEntity.id;
  userDTO.accessToken = userEntity.accessToken;
  userDTO.email = userEntity.email;
  userDTO.username = userEntity.username;
  userDTO.name = userEntity.name;
  userDTO.image = userEntity.image;
  userDTO.roles = userEntity.roles;
  userDTO.permissions = userEntity.permissions;
  return userDTO;
}
