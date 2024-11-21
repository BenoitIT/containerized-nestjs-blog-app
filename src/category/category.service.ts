import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostCategory } from "../entities/postcategories.entity";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(PostCategory)
    private CategoryRepository: Repository<PostCategory>
  ) {}
  getData(): Promise<PostCategory[]> {
    return this.CategoryRepository.find();
  }
  postdata(payload: PostCategory) {
    try {
      return this.CategoryRepository.save(payload);
    } catch (err) {
      console.error(err);
    }
  }
  getCategory({ post }: { post: number }) {
    return this.CategoryRepository.findOne({
      where: {
        id: Number(post),
      },
    });
  }
  deleteCategory({ post }: { post: number }) {
    return this.CategoryRepository.delete({
      id: Number(post),
    });
  }
}
