import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bookmark } from "src/entities/bookmark.entity";
import { Post } from "src/entities/post.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async addBookmark(
    userId: number,
    postId: number
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const post = await this.postRepository.findOne({ where: { id: postId } });

    if (!user || !post) {
      throw new NotFoundException("User or Post not found");
    }

    const bookmarkExists = await this.bookmarkRepository.findOne({
      where: { user, post },
    });
    if (bookmarkExists) {
      throw new ConflictException("Bookmark already exists");
    }

    const bookmark = this.bookmarkRepository.create({ user, post });
    const newBookmark = this.bookmarkRepository.save(bookmark);
    if (newBookmark) {
      return { message: "New bookmark is added." };
    } else {
      return { message: "Could not add new bookmark" };
    }
  }
  async getAllBookMark(userId: number) {
    return this.bookmarkRepository.find({
      where: {
        user: {
          id: Number(userId),
        },
      },
      relations: ['post', 'post.category'],
      select: {
        id:true,
        post: {
          id: true,
          title: true,
          description: true,
          createdAt: true,
          category: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
