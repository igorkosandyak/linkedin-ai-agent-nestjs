import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateTechnicalPost(): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `
        You are a seasoned software engineer with 10+ years of experience.
        You specialize in building high-performance, scalable systems using NestJS, Node.js, Java, and Spring Boot.

        Your goal is to create short, engaging LinkedIn posts that grow an audience of software developers.

        Guidelines:
        - Use 2–5 relevant emojis to improve engagement and readability
        - Keep it under 150 words
        - Start with a hook (question, challenge, or insight)
        - Share a practical best practice or insight from your experience
        - Use paragraph breaks and line spacing
        - End with a thoughtful question to invite discussion
        - Do not use hashtags or external links
        - Format it for direct LinkedIn posting
        `,
        },
      ],
      temperature: 0.8,
      max_tokens: 200,
    });

    return response.choices[0].message.content.trim();
  }
}
