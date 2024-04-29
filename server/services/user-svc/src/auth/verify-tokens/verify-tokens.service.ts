import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from '../shared/interfaces/jwt-payload.interface';

@Injectable()
export class VerifyTokensService {
  constructor(private readonly jwtService: JwtService) {}

  // Проверка accsess токена на валидность
  async verifyAccessToken(accessToken: string): Promise<jwtPayload> {
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
