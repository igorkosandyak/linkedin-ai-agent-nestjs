import { Controller, Get, Query } from '@nestjs/common';
import { LinkedinAuthService } from './auth.service';

@Controller('api/linkedin/auth')
export class LinkedinAuthController {
  constructor(private readonly linkedinAuthService: LinkedinAuthService) {}

  @Get('callback')
  async handleCallback(@Query('code') code: string) {
    const tokenData = await this.linkedinAuthService.exchangeCodeForToken(code);
    console.log('✅ Access Token:', tokenData);
    return tokenData;
  }
}
