import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: Prisma.PostUncheckedCreateInput) {
    if (createPostDto.authorId != null) {
      const createPost = await this.prisma.post.create({ data: createPostDto });

      return { message: 'create success', createPost };
    } else {
      return { message: 'failed pls login i sus' };
    }
  }

  async findAll() {
    const post = await this.prisma.post.findMany({
      include: { author: { select: { name: true } } },
    });
    return { msg: 'success', post };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
  findOne(data: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.findUnique({ where: { ...data } });
  }

  update(id: number, updatePostDto: Prisma.PostUncheckedUpdateInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
