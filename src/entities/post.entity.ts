import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { PostCategory } from "./postcategories.entity";
import { Like } from "./like.entity";
import { Comment } from "./comment.entity";

@Entity("Post", { schema: "public" })
export class Post {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "description" })
  description: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "writter" })
  writter: User;

  @ManyToOne(() => PostCategory, (category) => category.posts)
  @JoinColumn({ name: "category" })
  category: PostCategory;

  @Column("timestamp without time zone", {
    name: "createdAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];
  @OneToMany(() => Comment, (comment) => comment.post)
  comment: Comment[];
}
