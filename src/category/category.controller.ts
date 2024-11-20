import {
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Delete,
  Body,
} from "@nestjs/common";
import { AdminAuthGuard, AuthGuard } from "src/auth/auth.guard";
import { PostCategory } from "src/entities/postcategories.entity";
import { CategoryService } from "./category.service";

@Controller("category")
export class CategoryController {
  constructor(public postService: CategoryService) {}
  @Get()
  getCategory(): Promise<PostCategory[]> {
    return this.postService.getData();
  }
  @Post()
  @UseGuards(AdminAuthGuard)
  create(@Body() body: PostCategory) {
    return this.postService.postdata(body);
  }
  @Get("/:category")
  async getCategoryById(@Param() param: { post: number }) {
    const post = await this.postService.getCategory(param);
    if (post) {
      return { message: "category is found successfully", post };
    } else {
      return { message: "no category found", post: null };
    }
  }
  @Delete("/:category")
  @UseGuards(AdminAuthGuard)
  async deleteCategoryById(@Param() param: { post: number }) {
    const deletedUser = await this.postService.deleteCategory(param);
    if (deletedUser.affected > 0) {
      return { message: "category is deleted successfully" };
    } else {
      return { message: "category didn't found" };
    }
  }
}
