import {MigrationInterface, QueryRunner} from "typeorm";

export class thirdfix1653561934504 implements MigrationInterface {
    name = 'thirdfix1653561934504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "value" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "value"`);
    }

}
