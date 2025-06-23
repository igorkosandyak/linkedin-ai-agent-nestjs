import { Injectable } from '@nestjs/common';
import * as qs from 'qs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class LinkedinAuthService {
  constructor(private readonly httpService: HttpService) {}

  async exchangeCodeForToken(code: string) {
    const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';

    const data = qs.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const response = await this.httpService.axiosRef.post(tokenUrl, data, {
      headers,
    });

    return response.data;
  }
}
