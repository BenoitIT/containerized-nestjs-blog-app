import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("/login")
  login(@Body() payload: { email: string; password: string }) {
    return this.authService.checkUserCreds(payload);
  }
}