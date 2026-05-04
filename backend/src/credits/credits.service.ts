import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credit } from './credit.entity';

@Injectable()
export class CreditsService {
  constructor(
    @InjectRepository(Credit)
    private creditRepository: Repository<Credit>,
  ) {}

  async create(data: any) {
    const credit = this.creditRepository.create({
      customer: (data.customerName || "Unknown Customer").trim(),
      desc: (data.desc || "").trim(), // ✅ IMPORTANT FIX
      amount: Number(data.amount),
      dueDate: data.dueDate,
    });

    return await this.creditRepository.save(credit);
  }

  async findAll() {
    return await this.creditRepository.find({
      order: { id: 'DESC' },
    });
  }

  async remove(id: number) {
    return await this.creditRepository.delete(id);
  }
}