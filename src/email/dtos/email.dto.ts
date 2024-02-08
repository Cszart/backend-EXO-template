import { ApiProperty } from '@nestjs/swagger';

export class EmailTemplateDTO {
  id: number;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt?: string;

  @ApiProperty()
  modifiedAt?: string;
}
