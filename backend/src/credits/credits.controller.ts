import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.delete(Number(id));
  }

  // ✅ THIS IS THE CRITICAL FIX
  @Patch(':id/toggle')
  toggle(@Param('id') id: number) {
    return this.service.toggle(Number(id));
  }
}