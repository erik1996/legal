import { IsNumber, IsString } from 'class-validator';

export class LegalQueryInput {
  @IsNumber()
  topicId: number;

  @IsString()
  question: string;
}
