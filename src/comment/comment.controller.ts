import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Request,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { Comment } from "src/entities/comment.entity";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Get()
  async getAllComments(): Promise<Comment[]> {
    return this.commentService.getAllComments();
  }
  @UseGuards(AuthGuard)
  @Post()
  async createComment(
 
    @Body() body:{comment: string,postId:number},
    @Request() req: any
  ): Promise<Comment> {
    return this.commentService.createComment(req?.user?.id, body.postId, body.comment);
  }
  @UseGuards(AuthGuard)
  @Patch(":id")
  async updateComment(
    @Param("id", ParseIntPipe) id: number,
    @Body("comment") updatedText: string
  ): Promise<Comment> {
    return this.commentService.updateComment(id, updatedText);
  }
  @UseGuards(AuthGuard)
  @Delete(":id")
  async deleteComment(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.commentService.deleteComment(id);
  }
}
