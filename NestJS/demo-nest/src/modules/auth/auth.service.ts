import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async register(data: any) {
    const existingUser = await this.userModel.findOne({ email: data.email })
    if (existingUser) {
      throw new HttpException("User with this email Id already exists!", 400)
    }
    const hashPass = await bcrypt.hash(data.password, 10)
    const user = await this.userModel.create({
      ...data,
      password: hashPass
    })
    return {
      message: "User Registered Successfully",
      user:{
        id:user._id,
        name:user.name,
        email:user.email
      }
    }
  }

  async login(data: any) {
    const user = await this.userModel.findOne({ email: data.email })
    if (!user) {
      throw new NotFoundException("User does not exist!")
    }
    const isMatch = await bcrypt.compare(data.password, user.password)
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      userId: user._id,
      email: user.email,
    });

   
    return {
      message: 'Login successful',
      access_token: token,
      user:{
        id:user._id,
        name:user.name,
        email:user.email
      }
    };
  }
}
