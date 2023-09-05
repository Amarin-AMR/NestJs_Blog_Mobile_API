import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //   @Post('signin')
  //   signIn(@Body() createUserDto: Prisma.UserCreateInput) {
  //     return this.authService.signIn(createUserDto);
  //   }
  @Post('login')
  async signIn(@Body() body: Prisma.UserCreateInput) {
    return await this.authService.signIn(body.username, body.password);
  }

  @Post('regiter')
  async signUp(@Body() body: User) {
    return await this.authService.signUp(body);
  }

  @UseGuards(AuthGuard)
  @Get('test')
  authTest() {
    return 'test';
  }
}
