import {
    Injectable,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
    RegisterResponse,
    LoginResponse,
    GetMeResponse,
    UpdatePasswordResponse,
    SafeUser,
} from './types/auth.types';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ) { }

    async register(data: RegisterDto): Promise<RegisterResponse> {
        const userExists = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (userExists) {
            throw new BadRequestException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.prisma.user.create({
            data: {
                name: data.name.trim(),
                email: data.email.toLowerCase().trim(),
                password: hashedPassword,
                phone: data.phone,
                role: 'PATIENT',
                patient: {
                    create: {},
                },
            },
        });

        const safeUser: SafeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
        };

        return {
            message: 'Patient registered successfully',
            data: safeUser,
        };
    }

    async login(email: string, password: string): Promise<LoginResponse> {
        const user = await this.prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() },
        });

        if (!user || user.isDeleted) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwt.sign({
            userId: user.id,
            role: user.role,
        });

        const safeUser: SafeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
        };

        return {
            message: 'Login successful',
            data: {
                token,
                user: safeUser,
            },
        };
    }

    async getMe(userId: string): Promise<GetMeResponse> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                patient: true,
                doctor: true,
            },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return {
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image,
                patient: user.patient,
                doctor: user.doctor,
            },
        };
    }

    async updatePassword(
        userId: string,
        dto: UpdatePasswordDto,
    ): Promise<UpdatePasswordResponse> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isMatch = await bcrypt.compare(
            dto.currentPassword,
            user.password,
        );

        if (!isMatch) {
            throw new BadRequestException('Current password incorrect');
        }

        if (dto.currentPassword === dto.newPassword) {
            throw new BadRequestException('Passwords cannot be same');
        }

        const hashed = await bcrypt.hash(dto.newPassword, 10);

        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashed },
        });

        return {
            message: 'Password updated successfully',
        };
    }
}