import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../auth/roles.enum';

@Controller('users')
@UseGuards(JwtAuthGuard) // ✅ Protect all routes with JWT
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ✅ Fetch all users (Admins only)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // ✅ Create a new user (Admins only)
  @Post()
  async create(@Body() body: { email: string; password: string; role: Role }) {
    return this.usersService.createUser(body.email, body.password, body.role);
  }

  // ✅ Delete a user by ID (Admins only)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
