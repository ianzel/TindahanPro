import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private users: { username: string; password: string }[] = [];

  register(username: string, password: string) {
    const existing = this.users.find(u => u.username === username);

    if (existing) {
      return { message: 'User already exists' };
    }

    this.users.push({ username, password });

    return { message: 'Registered successfully' };
  }

  login(username: string, password: string) {
    const user = this.users.find(
      u => u.username === username && u.password === password,
    );

    if (!user) {
      return { message: 'Invalid credentials' };
    }

    return { message: 'Login successful', user };
  }
}