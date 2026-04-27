import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credit } from './credit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreditsService {
  constructor(
    @InjectRepository(Credit)
    private repo: Repository<Credit>,
  ) {}

  findAll() {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  create(data: Partial<Credit>) {
    const credit = this.repo.create(data);
    return this.repo.save(credit);
  }

  markPaid(id: number) {
    return this.repo.update(id, { isPaid: true });
  }
}