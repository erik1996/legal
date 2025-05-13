import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTopicDto } from './dto/create-topic.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/role')
  getRoles() {
    return this.appService.getAllRoles();
  }

  @Get('/countries')
  getCountries(@Query('lang') lang: string) {
    return this.appService.getCountriesByLangClaudeStyle(lang);
  }

  @Get('/questions')
  getQuestions() {
    return this.appService.getAllQuestionsWithOptions();
  }

  @Post('/topic')
  createTopic(@Body() data: CreateTopicDto) {
    return this.appService.createTopic(data);
  }
}
