import { UserEntity } from 'src/user/models/user.entity';
import { UserService } from 'src/user/services/user.service';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
