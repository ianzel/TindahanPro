import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // LOGIN
  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(
      body.email,
      body.password,
    );

    if (!user) {
      return {
        success: false,
        message: 'Invalid credentials',
      };
    }

    const token = this.authService.generateToken(user);

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    };
  }

  // REGISTER
  @Post('register')
  register(@Body() body: any) {
    try {
      const user = this.authService.register(body);
      const token = this.authService.generateToken(user);

      return {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        token,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Registration failed',
      };
    }
  }
}