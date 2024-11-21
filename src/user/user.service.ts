import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { UserData } from "src/interfaces/user.interface";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>
  ) {}
  getData(): Promise<User[]> {
    return this.UserRepository.find();
  }
  postdata(payload: UserData) {
    try {
      return this.UserRepository.save(payload);
    } catch (err) {
      console.error(err);
    }
  }
  getUser({ user }: { user: number }) {
    return this.UserRepository.findOne({
      where: {
        id: Number(user),
      },
    });
  }
  deleteUser({ user }: { user: number }) {
    return this.UserRepository.delete({
      id: Number(user),
    });
  }
}
