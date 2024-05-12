import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RefreshService } from './refresh.service';
import { RefreshTokenDto } from '../dto/RefreshToken.dto';

@Controller('refresh')
export class RefreshController {
  constructor(private readonly refreshService: RefreshService) {}

  @GrpcMethod('UserService', 'RefreshingToken')
  async refreshingToken(dto: RefreshTokenDto): Promise<any> {
    return await this.refreshService.refreshToken(dto);
  }
}
