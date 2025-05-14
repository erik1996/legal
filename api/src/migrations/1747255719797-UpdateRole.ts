import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRole1747255719797 implements MigrationInterface {
  name = 'UpdateRole1747255719797';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role" ADD "name_arm" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD "name_rus" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD "name_ara" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "name_ara"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "name_rus"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "name_arm"`);
  }
}
