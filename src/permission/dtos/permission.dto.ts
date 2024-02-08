import { ApiProperty } from '@nestjs/swagger';

export class PermissionDTO {
  id: number;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  subCategory: string;

  @ApiProperty()
  permission: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  modifiedAt: string;
}
