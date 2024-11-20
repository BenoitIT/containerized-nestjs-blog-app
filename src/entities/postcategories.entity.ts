import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./post.entity";

@Entity("PostCategory", { schema: "public" })
export class PostCategory {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];

  @Column("timestamp without time zone", {
    name: "createdAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
