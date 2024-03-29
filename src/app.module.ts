import { Module } from '@nestjs/common';

// Config modules
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom modules
import { RoleModule } from './role/roles.module';
import { UserModule } from './user/user.module';
import { PermissionModule } from './permission/roles.module';
import { EmailTemplateModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      // entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      retryDelay: 3000,
      retryAttempts: 10,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    RoleModule,
    PermissionModule,
    UserModule,
    EmailTemplateModule,
    AuthModule,
  ],
})
export class AppModule {}
