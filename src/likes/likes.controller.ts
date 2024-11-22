import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Request,
} from "@nestjs/common";
import { LikesService } from "./likes.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}
  @Get()
  async getAllLikes() {
    return this.likesService.getAllLikes();
  }
  @Get(":postId")
  async getLikesByPost(@Param("postId") postId: number) {
    return this.likesService.getLikesByPost(postId);
  }
  @UseGuards(AuthGuard)
  @Post("toggle")
  async toggleLike(
    @Request() req: any,
    @Body() body: {postId: number }
  ) {
    return this.likesService.toggleLike(req?.user?.id, body.postId);
  }
  @UseGuards(AuthGuard)
  @Post("is-liked")
  async isPostLikedByUser(
    @Request() req: any,
    @Body() body: {postId: number }
  ) {
    const isLiked = await this.likesService.isPostLikedByUser(
      req?.user?.id,
      body.postId
    );
    return { isLiked };
  }
}
