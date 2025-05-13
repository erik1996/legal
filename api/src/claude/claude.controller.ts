/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Post } from '@nestjs/common';
import { ClaudeService } from './claude.service';
import { LegalQueryInput } from './dto/legal-query';

@Controller('claude')
export class ClaudeController {
  constructor(private readonly claudeService: ClaudeService) {}

  @Post('ask')
  async askBasic(@Body() input: LegalQueryInput) {
    const result = await this.claudeService.getAnswerFromClaude(input);
    return { response: result };
  }
}
