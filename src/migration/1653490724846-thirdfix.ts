import {MigrationInterface, QueryRunner} from "typeorm";

export class thirdfix1653490724846 implements MigrationInterface {
    name = 'thirdfix1653490724846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wallet" ("id" SERIAL NOT NULL, "description" character varying, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(60) NOT NULL, "wallet_id" character varying(300) NOT NULL, "organization_id" integer, "employee_id" integer, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "organization_id"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "employee_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "employee_id" integer`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "organization_id" integer`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "name" character varying(60) NOT NULL`);
        await queryRunner.query(`DROP TABLE "wallet"`);
    }

}
