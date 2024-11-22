import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Post } from "./post.entity";

@Entity("comments", { schema: "public" })
export class Comment {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(() => User, (user) => user.comment, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userid" })
  user: User;

  @ManyToOne(() => Post, (post) => post.comment, { onDelete: "CASCADE" })
  @JoinColumn({ name: "postid" })
  post: Post;
  @Column("text", { name: "comment" })
  comment: string;
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
