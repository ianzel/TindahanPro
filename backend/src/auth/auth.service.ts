import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private users: any[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@test.com',
      password: bcrypt.hashSync('123456', 10),
    },
  ];

  // LOGIN
  async validateUser(email: string, password: string) {
    const user = this.users.find((u) => u.email === email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user;
  }

  // REGISTER
  register(userData: any) {
    const exists = this.users.find((u) => u.email === userData.email);

    if (exists) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: this.users.length + 1,
      username: userData.username,
      email: userData.email,
      password: bcrypt.hashSync(userData.password, 10),
    };

    this.users.push(newUser);

    return newUser;
  }

  // TOKEN
  generateToken(user: any) {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
  }
}