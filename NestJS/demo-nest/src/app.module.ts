import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration]
  }), AuthModule,DatabaseModule,UserModule
],
  controllers: [],
  providers: [],
})
export class AppModule { }
