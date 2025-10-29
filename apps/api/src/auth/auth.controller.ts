import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

// DTOs（データ転送オブジェクト）
class SignupDto {
  name: string;
  email: string;
  password: string;
}

class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 新規登録エンドポイント
   * POST /auth/signup
   */
  @Post('signup')
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(body.name, body.email, body.password);
  }

  /**
   * ログインエンドポイント
   * POST /auth/login
   */
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
}
