import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(data: RegisterDto) {
    const existing = await this.userRepository.findOne({
      where: { username: data.username },
    });

    if (existing) {
      throw new BadRequestException('Username already exists');
    }

    const user = this.userRepository.create({
      username: data.username,
      password: data.password,
    });

    await this.userRepository.save(user);

    return { message: 'Registration successful' };
  }

  async login(data: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { username: data.username },
    });

    if (!user || user.password !== data.password) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }
}