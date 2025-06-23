import { Body, Controller, Post } from '@nestjs/common';
import { LinkedinPostsService } from './posts.service';
import { OpenaiService } from 'src/openai/openai.service';

@Controller('api/linkedin/posts')
export class LinkedinPostsController {
  constructor(
    private readonly postService: LinkedinPostsService,
    private readonly openAiService: OpenaiService,
  ) {}

  @Post('publish')
  async createPost(@Body() body: { accessToken: string }) {
    const post = await this.openAiService.generateTechnicalPost();
    console.log(post);
    await this.postService.publishPost(body.accessToken, post);
    return { message: 'Post published to LinkedIn.' };
  }
}
