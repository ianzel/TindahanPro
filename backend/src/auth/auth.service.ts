import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(username: string, password: string) {
    const existing = await this.usersService.findByUsername(username);

    if (existing) {
      return { message: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersService.create({
      username,
      password: hashedPassword,
    });

    return { message: 'Registered successfully' };
  }

  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      return { message: 'Invalid credentials' };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { message: 'Invalid credentials' };
    }

    return { message: 'Login successful', user };
  }
}