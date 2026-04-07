import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

type User = {
  id: string;
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.create({
      email,
      password: hashedPassword,
    });

    return { message: 'User created', user };
  }

  async login(email: string, password: string) {
    const users = await this.userService.findAll();
    const user = users.find((u) => u.email === email);

    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException();

    const token = this.jwtService.sign({
      userId: user._id,
      email: user.email,
    });

    return { access_token: token };
  }

  getProfile(userId: string) {
    return this.users.find((u) => u.id === userId);
  }
}
