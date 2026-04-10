import { Controller, Post, Body, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtAuthGuard } from '../common/guards';
import { CurrentUser } from '../common/decorators';
import type { JwtPayload } from './strategy/jwt.strategy';
import {
    RegisterResponse,
    LoginResponse,
    GetMeResponse,
    UpdatePasswordResponse,
} from './types/auth.types';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() body: RegisterDto): Promise<RegisterResponse> {
        return await this.authService.register(body);
    }

    @Post('login')
    async login(@Body() body: LoginDto): Promise<LoginResponse> {
        return await this.authService.login(body.email, body.password);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getProfile(
        @CurrentUser() user: JwtPayload,
    ): Promise<GetMeResponse> {
        return await this.authService.getMe(user.userId);
    }

    @Patch('update-password')
    @UseGuards(JwtAuthGuard)
    async updatePassword(
        @CurrentUser() user: JwtPayload,
        @Body() dto: UpdatePasswordDto,
    ): Promise<UpdatePasswordResponse> {
        return await this.authService.updatePassword(user.userId, dto);
    }
}