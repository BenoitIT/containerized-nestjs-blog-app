import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Post } from "./post.entity";

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookmarks)
  user: User;

  @ManyToOne(() => Post, (post) => post.bookmarks)
  post: Post;

  @CreateDateColumn()
  createdAt: Date;
}