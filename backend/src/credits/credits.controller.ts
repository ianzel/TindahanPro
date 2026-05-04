import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { CreditsService } from './credits.service';

@Controller('credits')
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  @Post()
  create(@Body() data: any) {
    return this.creditsService.create(data);
  }

  @Get()
  findAll() {
    return this.creditsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditsService.remove(Number(id));
  }
}