import { Module } from '@nestjs/common';
import { LinkedinAuthController } from './linkedin/auth.controller';
import { LinkedinAuthService } from './linkedin/auth.service';
import { HttpModule } from '@nestjs/axios';
import { LinkedinPostsController } from './linkedin/posts.controller';
import { LinkedinPostsService } from './linkedin/posts.service';
import { OpenaiService } from './openai/openai.service';

@Module({
  imports: [HttpModule],
  controllers: [LinkedinAuthController, LinkedinPostsController],
  providers: [LinkedinAuthService, LinkedinPostsService, OpenaiService],
})
export class AppModule {}
