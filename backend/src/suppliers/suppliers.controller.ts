import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  findAll() {
    return this.suppliersService.findAll();
  }

  @Post()
  create(@Body() data: any) {
    return this.suppliersService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.suppliersService.remove(Number(id));
  }
}