import {MigrationInterface, QueryRunner} from "typeorm";

export class fourth1653910186337 implements MigrationInterface {
    name = 'fourth1653910186337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "avatar_url" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "avatar_url" SET NOT NULL`);
    }

}
