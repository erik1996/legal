import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTopicDto } from './dto/create-topic.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/role')
  getRoles(@Query('lang') lang: string) {
    return this.appService.getAllRoles(lang);
  }

  @Get('/countries')
  getCountries(@Query('lang') lang: string) {
    return this.appService.getCountriesByLangClaudeStyle(lang);
  }

  @Get('/questions')
  getQuestions(@Query('lang') lang: string) {
    return this.appService.getAllQuestionsWithOptions(lang);
  }

  @Post('/topic')
  createTopic(@Body() data: CreateTopicDto) {
    return this.appService.createTopic(data);
  }
}
