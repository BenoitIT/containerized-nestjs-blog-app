import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { Post as postModel } from "../entities/post.entity";
import { PostService } from "./post.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller("posts")
export class PostController {
  constructor(public postService: PostService) {}

  @Get()
  getPost(@Request() req: any,): Promise<postModel[]> {
    return this.postService.getData(req?.user?.id);
  }
  @Post()
  @UseGuards(AuthGuard)
  create(@Request() req: any, @Body() body: postModel) {
    body.writter = req.user.id;
    return this.postService.postdata(body);
  }
  @Get("/:post")
  async getPostById(@Param() param: { post: number }) {
    const post = await this.postService.getPost(param);
    if (post) {
      return { message: "post is found successfully", post };
    } else {
      return { message: "no post found", post: null };
    }
  }
  @Delete("/:post")
  @UseGuards(AuthGuard)
  async deletePostById(@Param() param: { post: number }) {
    const deletedUser = await this.postService.deletePost(param);
    if (deletedUser.affected > 0) {
      return { message: "post is deleted successfully" };
    } else {
      return { message: "post didn't found" };
    }
  }
}
