import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailTemplateController } from './controllers/email.controller';
import { EmailTemplateEntity } from './models/email.entity';
import { EmailTemplateService } from './services/email.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([EmailTemplateEntity])],
  providers: [EmailTemplateService],
  controllers: [EmailTemplateController],
})
export class RoleModule {}
