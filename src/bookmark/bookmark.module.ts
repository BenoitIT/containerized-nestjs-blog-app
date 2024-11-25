import { Module } from "@nestjs/common";
import { BookmarkController } from "./bookmark.controller";
import { BookmarkService } from "./bookmark.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bookmark } from "src/entities/bookmark.entity";
import { User } from "src/entities/user.entity";
import { Post } from "src/entities/post.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, User, Post])],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
