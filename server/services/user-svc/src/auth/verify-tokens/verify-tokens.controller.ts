import { Controller } from '@nestjs/common';
import { VerifyTokensService } from './verify-tokens.service';

@Controller()
export class VerifyTokensController {
  constructor(private readonly verifyTokensService: VerifyTokensService) {}
}
