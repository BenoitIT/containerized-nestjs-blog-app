import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/entities/post.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostController {
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
  getUser({ user }: { user: number }) {
    return this.PostRepository.findOne({
      where: {
        id: Number(user),
      },
    });
  }
  deleteUser({ user }: { user: number }) {
    return this.PostRepository.delete({
      id: Number(user),
    });
  }
}
