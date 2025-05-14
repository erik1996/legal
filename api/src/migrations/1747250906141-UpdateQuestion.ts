import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateQuestion1747250906141 implements MigrationInterface {
  name = 'UpdateQuestion1747250906141';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" ADD "question_rus" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD "question_ar" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "question_ar"`);
    await queryRunner.query(
      `ALTER TABLE "question" DROP COLUMN "question_rus"`,
    );
  }
}
