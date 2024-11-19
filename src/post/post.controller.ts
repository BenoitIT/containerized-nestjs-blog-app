import { Body, Controller, Get, Post, Param, Delete } from "@nestjs/common";
import { Post as postModel } from "src/entities/post.entity";
import { PostService } from "./post.service";

@Controller("post")
export class PostController {
  constructor(public postService: PostService) {}

  @Get()
  getUser(): Promise<postModel[]> {
    return this.postService.getData();
  }
  @Post()
  create(@Body() body: postModel) {
    return this.postService.postdata(body);
  }
  @Get("/:post")
  async getUserById(@Param() param: { post: number }) {
    const user = await this.postService.getPost(param);
    if (user) {
      return { message: "user is found successfully", user };
    } else {
      return { message: "no user found", user: null };
    }
  }
  @Delete("/:post")
  async deleteUserById(@Param() param: { post: number }) {
    const deletedUser = await this.postService.deletePost(param);
    if (deletedUser.affected > 0) {
      return { message: "post is deleted successfully" };
    } else {
      return { message: "post didn't found" };
    }
  }
}
