import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { returnUserObj } from './return.obj';

@Injectable()
export class UsersService {
  constructor(private readonly DBService: DatabaseService) {}

  async findByUAK(UAK: string) {
    const user = await this.DBService.user.findFirst({where:{UAK}, select: {...returnUserObj, UAK: true}});
    if (!user) throw new NotFoundException("User Not Found!");
    return user;
  }

  async findByEmailWithPassword(email: string) {
    const user = await this.DBService.user.findFirst({where:{email}, select: {...returnUserObj, password: true}});
    if (!user) throw new NotFoundException("User Not Found!");
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.DBService.user.findFirst({where:{email}, select: returnUserObj});
    if (!user) throw new NotFoundException("User Not Found!");
    return user;
  }

  async findById(id: number) {
    const user = await this.DBService.user.findFirst({where:{id}, select: returnUserObj});
    if (!user) throw new NotFoundException("User Not Found!");
    return user;
  }
}
