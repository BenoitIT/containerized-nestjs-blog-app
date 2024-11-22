import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "../entities/comment.entity";
import { User } from "src/entities/user.entity";
import { Post } from "src/entities/post.entity";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}
  async getAllComments(): Promise<Comment[]> {
    return this.commentRepository.find({
      relations: ["user", "post"],
    });
  }

  async createComment(userId: number, postId: number, commentText: string): Promise<Comment> {
    const user = await this.userRepository.findOne({ where: { id: userId },select:{
        id:true,
    } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const post = await this.postRepository.findOne({ where: { id: postId },select:{
        id:true,
    } });
    if (!post) {
      throw new NotFoundException("Post not found");
    }
    const postID=post.id;
    const newComment = this.commentRepository.create({
      user,
      post,
      comment: commentText,
    });

    return this.commentRepository.save(newComment);
  }

  async updateComment(commentId: number, updatedText: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id: commentId } });
    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    comment.comment = updatedText;
    return this.commentRepository.save(comment);
  }
  async deleteComment(commentId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id: commentId } });
    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    await this.commentRepository.remove(comment);
  }
}
