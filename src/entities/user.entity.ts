import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { Like } from "./like.entity";
@Entity("User", { schema: "public" })
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "firstName" })
  firstName: string;

  @Column("text", { name: "lastName" })
  lastName: string;

  @Column("text", { name: "email" })
  email: string;

  @Column("text", { name: "phone" })
  phone: string;
  @Column("text", { name: "gender" })
  gender: string;
  @Column("text", { name: "role", default: "user" })
  role: string;
  @Column("text", { name: "password" })
  password: string;

  @Column("timestamp without time zone", {
    name: "createdAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => Post, (post) => post.writter)
  posts: Post[];
  @OneToMany(() => Like, (like) => like.user)
likes: Like[];
  
}
