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

  findAll() {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  create(data: any) {
    const supplier = this.repo.create({
      name: data.name,
      contact: data.contact,
    });

    return this.repo.save(supplier);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}