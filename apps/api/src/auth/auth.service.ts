import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  /**
   * 新規登録
   */
  async signup(name: string, email: string, password: string) {
    // メールアドレスの重複チェック
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('このメールアドレスは既に登録されています');
    }

    // パスワードをハッシュ化
    const passwordHash = await bcrypt.hash(password, 10);

    // ユーザー作成
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    // JWTトークン生成
    const token = this.generateToken(user.id, user.email);

    return {
      success: true,
      message: '登録が完了しました',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  /**
   * ログイン
   */
  async login(email: string, password: string) {
    // ユーザー検索
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException(
        'メールアドレスまたはパスワードが正しくありません',
      );
    }

    // パスワード検証
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'メールアドレスまたはパスワードが正しくありません',
      );
    }

    // JWTトークン生成
    const token = this.generateToken(user.id, user.email);

    return {
      success: true,
      message: 'ログインしました',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  /**
   * JWTトークンを生成
   */
  private generateToken(userId: string, email: string): string {
    const secret = this.config.get<string>('JWT_SECRET') || 'default-secret';
    const expiresIn = this.config.get<string>('JWT_EXPIRES_IN') || '7d';

    return jwt.sign({ sub: userId, email }, secret, {
      expiresIn,
    } as jwt.SignOptions);
  }
}
