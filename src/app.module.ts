import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserModule } from "./user/user.module";
import { AppService } from "./app.service";
import { TypeOrmModule } from "./datasource/ typeorm.module";
import { PostModule } from "./post/post.module";
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    TypeOrmModule,
    UserModule,
    PostModule,
    AuthModule,
    CategoryModule,
    LikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
