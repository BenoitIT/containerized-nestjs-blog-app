import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserModule } from "./user/user.module";
import { AppService } from "./app.service";
import { TypeOrmModule } from "./datasource/ typeorm.module";

@Module({
  imports: [TypeOrmModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
