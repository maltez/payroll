import {MigrationInterface, QueryRunner} from "typeorm";

export class third1653490407011 implements MigrationInterface {
    name = 'third1653490407011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "organization_wallet_id"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "name" character varying(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "organization_id" integer`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "employee_id" integer`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "status" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "organization_wallet_id" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "wallet_id"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "wallet_id" character varying(300) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "wallet_id"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "wallet_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "organization_wallet_id"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "organization_id"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "organization_wallet_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "status" character varying(20) NOT NULL`);
    }

}
