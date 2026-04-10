import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post('register')
  register(@Body() body: CreateUserDto) {
    return this.authService.register(body)
  }
  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.authService.login(body)
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@Req() req) {
    return {
      message: 'User fetched successfully',
      user: req.user,
    };
  }
}
