import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

// Notes
import { RoleService } from './services/role.service';
import { RoleEntity } from './models/role.entity';
import { RoleController } from './controllers/role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
