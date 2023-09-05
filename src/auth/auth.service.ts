import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  //   async signIn(signInDto: Prisma.UserCreateInput) {
  //     const email = signInDto.email;
  //     const pass = signInDto.password;
  //     const checkUser = await this.prisma.user.findUnique({
  //       where: { email: email },
  //     });
  //     if (pass === checkUser.password) {
  //       return { status: 'login success' };
  //     } else {
  //       return { status: 'no data??!!!' };
  //     }
  //   }
  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ username });
    const isMatch = await bcrypt.compare(pass, user.password);
    // console.log(isMatch);
    // if (user?.password !== pass)
    if (!isMatch) {
      throw new UnauthorizedException();
    } else {
      // const { password, ...result } = user;
      const { password, ...payload } = user;
      // const { ...payload } = user;
      // TODO: Generate a JWT and return it here
      const access_token = await this.jwtService.signAsync(payload);

      // instead of the user object
      return { access_token };
    }
  }

  async signUp(userBody: Prisma.UserCreateInput) {
    const password = await bcrypt.hash(userBody.password, 10);
    const newUser = { ...userBody, password };
    return this.userService.create(newUser);
  }
}
