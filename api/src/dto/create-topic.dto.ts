import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

class QuestionAnswerDto {
  @IsNumber()
  @Type(() => Number)
  questionId: number;

  @IsNumber()
  @Type(() => Number)
  answerId: number;
}

export class CreateTopicDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionAnswerDto)
  questionAnswerMap: QuestionAnswerDto[];

  @IsString()
  country: string;

  @IsNumber()
  roleId: number;
}
