import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class LinkedinPostsService {
  private readonly logger = new Logger(LinkedinPostsService.name);
  constructor(private readonly httpService: HttpService) {}

  async publishPost(accessToken: string, postContent: string) {
    const userInfo = await this._getUserInfo(accessToken);
    const authorUrn = `urn:li:person:${userInfo.data.sub}`;

    const post = await this._publishPost(accessToken, authorUrn, postContent);
    this.logger.log(`✅ Post published: ${post.status}`);
    return post;
  }

  private async _getUserInfo(accessToken: string) {
    const userInfoRes = await this.httpService.axiosRef.get(
      'https://api.linkedin.com/v2/userinfo',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return userInfoRes;
  }

  private async _publishPost(
    accessToken: string,
    authorUrn: string,
    postContent: string,
  ) {
    const response = await this.httpService.axiosRef.post(
      'https://api.linkedin.com/v2/ugcPosts',
      {
        author: authorUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: postContent,
            },
            shareMediaCategory: 'NONE',
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  }
}
