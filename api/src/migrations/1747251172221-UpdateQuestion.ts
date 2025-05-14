import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateQuestion1747251172221 implements MigrationInterface {
  name = 'UpdateQuestion1747251172221';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" RENAME COLUMN "question_ar" TO "question_ara"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" RENAME COLUMN "question_ara" TO "question_ar"`,
    );
  }
}
