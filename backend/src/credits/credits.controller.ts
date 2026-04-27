import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CreditsService } from './credits.service';

@Controller('credits')
export class CreditsController {
  constructor(private readonly service: CreditsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Patch(':id/pay')
  pay(@Param('id') id: number) {
    return this.service.markPaid(Number(id));
  }
}