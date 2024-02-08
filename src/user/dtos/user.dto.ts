import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  id: number;
  accessToken?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  roles: string[];

  @ApiProperty()
  permissions: string[];
}
