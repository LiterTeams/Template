import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { returnUserObj } from './return.user.obj';
import { MetaIF } from 'src/interfaces/system.interfaces';

@Injectable()
export class UsersService {
  constructor(private readonly DBService: DatabaseService){}

  async getUserById(id: number){
    const user = await this.DBService.user.findUnique({where:{id},select:returnUserObj});
		if (!user) throw new NotFoundException("User Not Found!");
		return user;
  }

  async getUserByEmail(email: string){
    const user = await this.DBService.user.findUnique({where:{email},select:returnUserObj});
		if (!user) throw new NotFoundException("User Not Found!");
		return user;
  }

  async findAll() {
    const data = await this.DBService.user.findMany({select:returnUserObj});
    const meta: MetaIF = { pages: 1, items: data.length };
    return { data, meta }
  }

  async update(id: number, DTO: Prisma.UserUpdateInput) {
    await this.getUserById(id);
		return this.DBService.user.update({where:{id},data: DTO, select:returnUserObj});
	}

  async toggleBlock(id: number) {
    const user = await this.getUserById(id);
    return this.DBService.user.update({where:{id}, data: {blocking: !user.blocking}});
  }

  async remove(id: number) {
    await this.getUserById(id);
		return this.DBService.user.delete({where:{id}});
	}
}
