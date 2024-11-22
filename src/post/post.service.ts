import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "../entities/post.entity";
import { Like } from "../entities/like.entity";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Like)
    private likeRepository: Repository<Like>
  ) {}
  async getData(currentUserId: number): Promise<any[]> {
    const posts = await this.postRepository.find({
      relations: ["category", "writter"],
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        writter: {
          id: true,
          firstName: true,
          lastName: true,
        },
        category: {
          id: true,
          name: true,
        },
      },
    });
    const userLikes = await this.likeRepository.find({
      where: { user: { id: currentUserId } },
      relations: ["post"],
    });
    const likedPostIds = new Set(userLikes.map((like) => like.post.id));

    return posts.map((post) => ({
      ...post,
      isLikedByCurrentUser: likedPostIds.has(post.id),
    }));
  }

  postdata(payload: Post) {
    try {
      return this.postRepository.save(payload);
    } catch (err) {
      console.error(err);
    }
  }

  getPost({ post }: { post: number }) {
    return this.postRepository.findOne({
      where: {
        id: Number(post),
      },
    });
  }

  deletePost({ post }: { post: number }) {
    return this.postRepository.delete({
      id: Number(post),
    });
  }
}
