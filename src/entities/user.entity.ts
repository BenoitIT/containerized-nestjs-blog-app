import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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

  @Column("text", { name: "password" })
  password: string;

  @Column("timestamp without time zone", {
    name: "createdAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
