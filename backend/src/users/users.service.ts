import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(data: { username: string; password: string }) {
    const user = this.usersRepo.create(data);
    return this.usersRepo.save(user);
  }

  async findByUsername(username: string) {
    return this.usersRepo.findOne({ where: { username } });
  }
}