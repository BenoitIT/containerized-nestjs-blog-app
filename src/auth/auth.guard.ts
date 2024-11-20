import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException("Access denied");
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request["user"] = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}

export class AdminAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException("Authorization token is missing");
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request["user"] = payload;

      if (payload?.role === "admin") {
        return true;
      }
      throw new UnauthorizedException("Access restricted to admins");
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException("Authorization header is missing");
    }
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer" || !token) {
      throw new UnauthorizedException("Invalid authorization format");
    }
    return token;
  }
}
