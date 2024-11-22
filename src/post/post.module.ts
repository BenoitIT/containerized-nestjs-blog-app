import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "../entities/post.entity";
import { Like } from "../entities/like.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Post,Like])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
