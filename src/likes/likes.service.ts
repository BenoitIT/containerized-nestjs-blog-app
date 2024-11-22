import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "../entities/like.entity";
import { Repository } from "typeorm";

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>
  ) {}

  async getAllLikes(): Promise<Like[]> {
    return await this.likeRepository.find({
      relations: ["user", "post"],
      select: {
        id: true,
        createdAt: true,
        user: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    });
  }
  async getLikesByPost(postId: number): Promise<Like[]> {
    return await this.likeRepository.find({
      where: { post: { id: postId } },
      relations: ["user"],
      select: {
        id: true,
        createdAt: true,
        user: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    });
  }
  async toggleLike(
    userId: number,
    postId: number
  ): Promise<{ message: string }> {
    const existingLike = await this.likeRepository.findOne({
      where: {
        user: { id: userId },
        post: { id: postId },
      },
    });

    if (existingLike) {
      await this.likeRepository.remove(existingLike);
      return { message: "Like added" };
    } else {
      const newLike = this.likeRepository.create({
        user: { id: userId },
        post: { id: postId },
      });
      await this.likeRepository.save(newLike);
      return { message: "Like added" };
    }
  }

  async isPostLikedByUser(userId: number, postId: number): Promise<boolean> {
    const like = await this.likeRepository.findOne({
      where: {
        user: { id: userId },
        post: { id: postId },
      },
    });
    return !!like;
  }
}
