import { ApiProperty } from '@nestjs/swagger';

export class RoleDTO {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  modifiedAt: string;
}
