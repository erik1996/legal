import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1746902354309 implements MigrationInterface {
  name = 'Initial1746902354309';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "systemMessage" text NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "topic" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "country" character varying NOT NULL, "questionAnswerMap" jsonb NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "topic_query" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "topicId" integer NOT NULL, "userQuestion" text NOT NULL, "aiResponse" text, CONSTRAINT "PK_bdaec31525627a5919749fa39d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question_option" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "option" text NOT NULL, "questionId" integer NOT NULL, CONSTRAINT "PK_64f8e42188891f2b0610017c8f9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "question" text NOT NULL, "priority" integer NOT NULL, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question_role" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "questionId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_c1f060406660d2e8de3b84258e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "topic" ADD CONSTRAINT "FK_9e061d2e3afd301199f2225d33b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "topic_query" ADD CONSTRAINT "FK_d00aa174823078cb627de8bab4b" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_option" ADD CONSTRAINT "FK_ba19747af180520381a117f5986" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_role" ADD CONSTRAINT "FK_d497a3e4d1532f235e2c2be20e3" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_role" ADD CONSTRAINT "FK_57e0cd19eea2ac78a4a6d8b903d" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question_role" DROP CONSTRAINT "FK_57e0cd19eea2ac78a4a6d8b903d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_role" DROP CONSTRAINT "FK_d497a3e4d1532f235e2c2be20e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_option" DROP CONSTRAINT "FK_ba19747af180520381a117f5986"`,
    );
    await queryRunner.query(
      `ALTER TABLE "topic_query" DROP CONSTRAINT "FK_d00aa174823078cb627de8bab4b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "topic" DROP CONSTRAINT "FK_9e061d2e3afd301199f2225d33b"`,
    );
    await queryRunner.query(`DROP TABLE "question_role"`);
    await queryRunner.query(`DROP TABLE "question"`);
    await queryRunner.query(`DROP TABLE "question_option"`);
    await queryRunner.query(`DROP TABLE "topic_query"`);
    await queryRunner.query(`DROP TABLE "topic"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
