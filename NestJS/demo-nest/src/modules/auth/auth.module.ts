import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { CommonModule } from 'src/common/guards/common.module';

@Module({
  imports: [ConfigModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),CommonModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard]
})
export class AuthModule { }
