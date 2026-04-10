import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserService } from './user.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() body: CreateUserDto) {
        return this.userService.create(body);
    }


    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    findAll() {
        return this.userService.findAll();
    }


    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.userService.findOne(Number(id));
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getProfile(@CurrentUser() user: any) {
        return user;
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(Number(id), body);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    remove(@Param('id') id: string) {
        return this.userService.remove(Number(id));
    }
}