import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserModule } from "./user/user.module";
import { AppService } from "./app.service";
import { TypeOrmModule } from "./datasource/ typeorm.module";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";

import { PostModule } from "./post/post.module";

@Module({
  imports: [
    TypeOrmModule,
    // CacheModule.register({
    //   isGlobal: true,
    //   ttl: 30 * 1000,
    //   store: redisStore,
    // }),
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
