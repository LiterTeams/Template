import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import Auth from "src/decorators/auth.decorator";
import CurrentUser from 'src/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Get("profile")
  async findProfile(@CurrentUser("id") user_id: string) {
    return this.usersService.findById(+user_id);
  }

}
