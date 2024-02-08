import { ApiProperty } from '@nestjs/swagger';

export class LoginPayloadDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoginWalletPayloadDTO {
  @ApiProperty()
  address: string;
}
