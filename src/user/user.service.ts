import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // create(createUserDto: Prisma.UserCreateInput) {
  //   return this.prisma.user.create({
  //     data: createUserDto,
  //   });
  // }
  async create(createUserDto: Prisma.UserCreateInput) {
    const check = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });
    if (check) {
      console.log('invalid');
      return { status: 'Invalid' };
    } else {
      return this.prisma.user.create({
        data: createUserDto,
      });
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
  findOne(data: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({ where: { ...data } });
  }

  update(
    id: Prisma.UserWhereUniqueInput,
    updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.prisma.user.update({ data: updateUserDto, where: id });
  }

  remove(id: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({ where: id });
  }

  removeAll() {
    return this.prisma.user.deleteMany();
  }
}
