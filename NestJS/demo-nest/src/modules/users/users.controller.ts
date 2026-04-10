import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { AuthGuard } from "src/common/guards/auth.guard";
import { Mongoose, Types } from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { NotFoundError } from "rxjs";

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  getAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    if(!Types.ObjectId.isValid(id))throw new NotFoundException("User Not Found!!")
    return this.userService.findOne(id)
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() body: any) {
    if(!Types.ObjectId.isValid(id))throw new NotFoundException("User Not Found!!")
    return this.userService.updateOne(id, body)
  }

  @Delete(':id')
  deleteOne(@Param('id') id:string){
    if(!Types.ObjectId.isValid(id))throw new NotFoundException("User Not Found!!")
    return this.userService.deleteOne(id)
  }
}