import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private repo: Repository<Supplier>,
  ) {}

  create(data: any) {
    const s = this.repo.create(data);
    return this.repo.save(s);
  }

  findAll() {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}