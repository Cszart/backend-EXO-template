import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';

import { AuthService } from '../services/auth.service';
import { UserDTO } from 'src/user/dtos/user.dto';
import { LoginPayloadDTO, LoginWalletPayloadDTO } from '../dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginPayloadDTO, description: 'User email' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  loginUser(@Body() loginPayload: LoginPayloadDTO): Promise<HttpResponseI<UserDTO>> {
    return this.authService.loginUser(loginPayload.email);
  }

  @Post('login/wallet')
  @ApiBody({ type: LoginWalletPayloadDTO, description: 'Wallet address' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  loginWallet(@Body() loginPayload: LoginWalletPayloadDTO): Promise<HttpResponseI<UserDTO>> {
    return this.authService.loginWallet(loginPayload.address);
  }

  @Post('signup')
  @ApiBody({ type: UserDTO, description: 'User data' })
  @ApiResponse({ status: 200, description: 'User signed up successfully' })
  signUpUser(@Body() userData: UserDTO): Promise<HttpResponseI<UserDTO>> {
    return this.authService.signUpUser(userData);
  }
}
