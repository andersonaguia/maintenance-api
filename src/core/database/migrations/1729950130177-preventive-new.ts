import { MigrationInterface, QueryRunner } from "typeorm";

export class PreventiveNew1729950130177 implements MigrationInterface {
    name = 'PreventiveNew1729950130177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`noticeDate\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`noticeWasSent\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`next\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`last\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`currentStatus\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`noticeDate\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`noticeWasSent\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD CONSTRAINT \`FK_40ee2d1b6a0e01461bc40c7aba0\` FOREIGN KEY (\`currentStatus\`) REFERENCES \`current_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP FOREIGN KEY \`FK_40ee2d1b6a0e01461bc40c7aba0\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`noticeWasSent\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`noticeDate\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`currentStatus\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`last\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`next\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`noticeWasSent\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`noticeDate\` datetime NOT NULL`);
    }

}
