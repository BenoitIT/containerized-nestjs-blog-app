import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostCategory } from "src/entities/postcategories.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PostCategory])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
