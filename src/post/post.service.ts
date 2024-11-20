import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { postData } from "src/interfaces/post.interface";
import { Repository } from "typeorm";
import { Post } from "src/entities/post.entity";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private PostRepository: Repository<Post>
  ) {}
  getData(): Promise<Post[]> {
    return this.PostRepository.find();
  }
  postdata(payload: Post) {
    try {
      return this.PostRepository.save(payload);
    } catch (err) {
      console.error(err);
    }
  }
  getPost({ post }: { post: number }) {
    return this.PostRepository.findOne({
      where: {
        id: Number(post),
      },
    });
  }
  deletePost({ post }: { post: number }) {
    return this.PostRepository.delete({
      id: Number(post),
    });
  }
}
