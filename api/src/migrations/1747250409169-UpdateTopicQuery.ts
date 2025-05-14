import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTopicQuery1747250409169 implements MigrationInterface {
  name = 'UpdateTopicQuery1747250409169';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "topic_query" ADD "score" integer`);
    await queryRunner.query(`ALTER TABLE "question" ADD "question_arm" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" DROP COLUMN "question_arm"`,
    );
    await queryRunner.query(`ALTER TABLE "topic_query" DROP COLUMN "score"`);
  }
}
