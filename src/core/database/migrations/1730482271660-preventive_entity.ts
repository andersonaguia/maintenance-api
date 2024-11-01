import { MigrationInterface, QueryRunner } from "typeorm";

export class PreventiveEntity1730482271660 implements MigrationInterface {
    name = 'PreventiveEntity1730482271660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`noticeDate\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`noticeDate\``);
    }

}
