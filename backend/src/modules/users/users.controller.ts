import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  async getUserById(@Param("id") id: string) {
    return this.usersService.getUserById(+id);
  }

  @Get(":email")
  async getUserByEmail(@Param("email") email: string) {
    return this.usersService.getUserByEmail(email);
  }
  
  @HttpCode(200)
  @Patch(":id")
  async update(id: number, @Body() DTO: Prisma.UserUpdateInput) {
    return this.usersService.update(id, DTO);
  }

  @HttpCode(200)
  @Patch("toggle-block/:id")
  async toggleBlock(@Param("id") id: string) {return await this.usersService.toggleBlock(+id);}
  
  @HttpCode(200)
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
