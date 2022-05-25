import {MigrationInterface, QueryRunner} from "typeorm";

export class second1653487492522 implements MigrationInterface {
    name = 'second1653487492522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "amount" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "wallet_secret_id" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "wallet_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "wallet_id" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "wallet_id"`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "wallet_id" character varying(300) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "wallet_id"`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "wallet_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "wallet_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "wallet_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "wallet_secret_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "amount"`);
    }

}
