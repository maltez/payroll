import {MigrationInterface, QueryRunner} from "typeorm";

export class thirdfix1653567316391 implements MigrationInterface {
    name = 'thirdfix1653567316391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "payer_secret_id" character varying(300) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "payer_secret_id"`);
    }

}
