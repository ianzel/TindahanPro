import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { Product } from '../products/product.entity';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(data: CreateSaleDto) {
    const product = await this.productRepository.findOne({
      where: { id: data.productId },
    });

    if (!product) throw new NotFoundException('Product not found');
    if (data.quantity <= 0) throw new BadRequestException('Invalid quantity');

    if (product.stock < data.quantity) {
      throw new BadRequestException(`Not enough stock (${product.stock})`);
    }

    const unitPrice = Number(product.sellingPrice);
    const unitCost = Number(product.buyingPrice);

    const totalAmount = unitPrice * data.quantity;
    const profit = (unitPrice - unitCost) * data.quantity;

    // ✅ reduce stock
    product.stock -= data.quantity;
    await this.productRepository.save(product);

    // ✅ include productName
    const sale = this.saleRepository.create({
      productId: data.productId,
      productName: product.name,
      quantity: data.quantity,
      unitPrice,
      unitCost,
      totalAmount,
      profit,
    });

    return await this.saleRepository.save(sale);
  }

  async findAll() {
    return await this.saleRepository.find({
      order: { id: 'DESC' },
    });
  }
}