import { Body, Controller, Get, Post } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() data: CreateSaleDto) {
    return this.salesService.create(data);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }
}