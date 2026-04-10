import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../auth/schemas/user.schema";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { CommonModule } from "src/common/guards/common.module";

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:User.name,schema:UserSchema}
    ]),CommonModule
  ],
  controllers:[UserController],
  providers:[UserService],
  exports: [UserService]
})

export class UserModule{}