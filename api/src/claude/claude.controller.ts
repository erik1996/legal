import { Body, Controller, Post, Query } from '@nestjs/common';
import { ClaudeService } from './claude.service';
import { LegalQueryInput } from './dto/legal-query';

@Controller('claude')
export class ClaudeController {
  constructor(private readonly claudeService: ClaudeService) {}

  @Post('ask')
  async askBasic(@Body() input: LegalQueryInput, @Query('lang') lang: string) {
    const result = await this.claudeService.getAnswerFromClaude(input, lang);
    return { response: result };
  }
}
