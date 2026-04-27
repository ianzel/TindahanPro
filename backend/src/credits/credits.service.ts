import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credit } from './credit.entity';

@Injectable()
export class CreditsService {
  constructor(
    @InjectRepository(Credit)
    private repo: Repository<Credit>,
  ) {}

  create(data: any) {
    const c = this.repo.create(data);
    return this.repo.save(c);
  }

  findAll() {
    return this.repo.find({ order: { id: 'DESC' } });
  }
}