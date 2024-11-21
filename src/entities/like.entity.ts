import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Post } from "./post.entity";

@Entity("likes", { schema: "public" })
export class Like {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userid" })
  user: User;

  @ManyToOne(() => Post, (post) => post.likes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "postid" })
  post: Post;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
