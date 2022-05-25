import {MigrationInterface, QueryRunner} from "typeorm";

export class first1653446097015 implements MigrationInterface {
    name = 'first1653446097015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "payment_id_seq" OWNED BY "payment"."id"`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "id" SET DEFAULT nextval('"payment_id_seq"')`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "employee_id_seq" OWNED BY "employee"."id"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "id" SET DEFAULT nextval('"employee_id_seq"')`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "organization_id_seq" OWNED BY "organization"."id"`);
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "id" SET DEFAULT nextval('"organization_id_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "organization_id_seq"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "employee_id_seq"`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "payment_id_seq"`);
    }

}
