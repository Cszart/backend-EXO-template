import { Controller, Post, Body } from '@nestjs/common';

import { HttpResponseI } from 'src/httpResponse/models/httpResponse.interface';
import { UserI } from 'src/user/models/user.interface';

import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  loginUser(@Body('email') email: string): Promise<HttpResponseI<UserI>> {
    return this.authService.loginUser(email);
  }

  // -- This returns a static response
  @Post('login/wallet')
  loginWallet(@Body('address') address: string): Promise<HttpResponseI<UserI>> {
    return this.authService.loginWallet(address);
  }

  @Post('signup')
  signUpUser(@Body() userData: UserI): Promise<HttpResponseI<UserI>> {
    return this.authService.signUpUser(userData);
  }
}
