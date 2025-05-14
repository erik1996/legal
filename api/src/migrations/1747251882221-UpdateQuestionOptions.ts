import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateQuestionOptions1747251882221 implements MigrationInterface {
  name = 'UpdateQuestionOptions1747251882221';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question_option" ADD "option_arm" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_option" ADD "option_rus" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_option" ADD "option_ara" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question_option" DROP COLUMN "option_ara"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_option" DROP COLUMN "option_rus"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_option" DROP COLUMN "option_arm"`,
    );
  }
}
