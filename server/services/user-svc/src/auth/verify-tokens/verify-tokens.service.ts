import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'proto/builds/user_svc';

@Injectable()
export class VerifyTokensService {
  constructor(private readonly jwtService: JwtService) {}

  // Проверка accsess токена на валидность
  async verifyAccessToken(accessToken: string): Promise<JwtPayload> {
    try {
      const payload = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_SECRET,
      });

      return payload;
    } catch (err) {
      return null;
    }
  }
}
