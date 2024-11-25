import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
} from "@nestjs/common";
import { BookmarkService } from "./bookmark.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("bookmarks")
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  @UseGuards(AuthGuard)
  async addBookmark(@Request() req: any, @Body("postId") postId: number) {
    const userId = req.user.id;
    return this.bookmarkService.addBookmark(userId, postId);
  }
  @Get()
  @UseGuards(AuthGuard)
  async getAllBookmarks(@Request() req: any) {
    const userId = req.user.id;
    return this.bookmarkService.getAllBookMark(userId);
  }
}
