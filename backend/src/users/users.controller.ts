import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() body: any) {
    return this.usersService.update(id, body);
  }
}