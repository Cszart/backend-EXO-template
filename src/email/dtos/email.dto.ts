import { ApiProperty } from '@nestjs/swagger';

export class EmailTemplateDTO {
  id: number;

  @ApiProperty()
  uuid?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  content: string;

  createdAt?: string;
  modifiedAt?: string;
}
