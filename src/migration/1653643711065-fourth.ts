import {MigrationInterface, QueryRunner} from "typeorm";

export class fourth1653643711065 implements MigrationInterface {
    name = 'fourth1653643711065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "avatar_url" character varying(600) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "avatar_url"`);
    }

}
