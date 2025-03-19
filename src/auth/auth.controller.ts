/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Role } from './roles.enum';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(
      await this.authService.validateUser(body.email, body.password),
    );
  }
  @Post('register-admin')
  async registerAdmin(@Body() body: { email: string; password: string }) {
    return this.usersService.createUser(body.email, body.password, Role.Admin);
  }

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(
    @Request() req,
    @Body() body: { email: string; password: string; role: Role },
  ) {
    if (req.user.role !== Role.Admin) {
      return { message: 'Only Admins can create new users' };
    }
    return this.usersService.createUser(body.email, body.password, body.role);
  }
}
