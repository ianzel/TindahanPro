import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(data: CreateProductDto) {
    const product = this.productRepository.create(data);
    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find({
      order: { id: 'DESC' },
    });
  }

  async remove(id: number) {
    await this.productRepository.delete(id);
    return { message: 'Product deleted successfully' };
  }
}