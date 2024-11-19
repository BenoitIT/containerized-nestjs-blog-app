import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    private jwtService: JwtService
  ) {}
  async checkUserCreds({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await this.authRepository.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      if (user.password === password) {
        const payload = {
          id: user.id,
          email: user.email,
          name: user.firstName,
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return { message: "You are loggedin successfully", token: accessToken };
      } else {
        throw new UnauthorizedException("Incorrect password");
      }
    } else {
      throw new UnauthorizedException("Incorrect username and password");
    }
  }
}
