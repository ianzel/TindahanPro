import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credit } from './credit.entity';

@Injectable()
export class CreditsService {
  constructor(
    @InjectRepository(Credit)
    private repo: Repository<Credit>,
  ) {}

  findAll() {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  create(data: any) {
    const credit = this.repo.create({
      customer: data.customerName,
      desc: data.desc,
      amount: data.amount,
      dueDate: data.dueDate,
      isPaid: false,
    });

    return this.repo.save(credit);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }

  async toggle(id: number) {
    const credit = await this.repo.findOne({ where: { id } });

    if (!credit) throw new NotFoundException('Credit not found');

    credit.isPaid = !credit.isPaid;

    return this.repo.save(credit);
  }
}