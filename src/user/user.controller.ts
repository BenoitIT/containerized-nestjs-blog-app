import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserData } from "src/interfaces/user.interface";
import { User } from "src/entities/user.entity";
import { CacheInterceptor, CacheKey } from "@nestjs/cache-manager";

@Controller("users")
// @UseInterceptors(CacheInterceptor)
export class UserController {
  constructor(public userService: UserService) {}

  @Get()
  // @CacheKey("MYKEY")
  getUser(): Promise<User[]> {
    return this.userService.getData();
  }
  @Post()
  create(@Body() body: UserData) {
    return this.userService.postdata(body);
  }
  @Get("/:user")
  // @CacheKey("MYKEY")
  async getUserById(@Param() param: { user: number }) {
    const user = await this.userService.getUser(param);
    if (user) {
      return { message: "user is found successfully", user };
    } else {
      return { message: "no user found", user: null };
    }
  }
  @Delete("/:user")
  async deleteUserById(@Param() param: { user: number }) {
    const deletedUser = await this.userService.deleteUser(param);
    if (deletedUser.affected > 0) {
      return { message: "user is deleted successfully" };
    } else {
      return { message: "user didn't found" };
    }
  }
}
