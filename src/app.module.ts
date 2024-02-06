import { Module } from '@nestjs/common';

// Config modules
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/roles.module';
import { PermissionModule } from './role copy/roles.module';
import { UserModule } from './user/user.module';

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
  ],
})
export class AppModule {}
