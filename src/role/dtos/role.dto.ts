import { ApiProperty } from '@nestjs/swagger';

export class RoleDTO {
  id: number;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  modifiedAt: string;
}
