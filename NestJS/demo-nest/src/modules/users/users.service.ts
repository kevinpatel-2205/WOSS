import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../auth/schemas/user.schema";
import { Model } from "mongoose";
import { after } from "node:test";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async findAll() {
    return this.userModel.find().select("-password")
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).select("-password")
    if (!user) throw new NotFoundException("User Not Found!!")
    return user
  }

  async updateOne(id: string, data: any) {
    const user = await this.userModel.findByIdAndUpdate(id, data, { returnDocument: 'after' }).select("-password")
    if (!user) throw new NotFoundException("User Not Found!!")
    return user
  }

  async deleteOne(id: string) {
    const user = await this.userModel.findByIdAndDelete(id)
    if (!user) throw new NotFoundException("User Not Found!!")
    return user
  }
}