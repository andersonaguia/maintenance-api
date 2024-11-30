import { MigrationInterface, QueryRunner } from "typeorm";

export class CorrectiveHistory1732978013347 implements MigrationInterface {
    name = 'CorrectiveHistory1732978013347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`corrective_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`comments\` varchar(500) NULL, \`correctiveId\` int NOT NULL, \`currentStatus\` int NOT NULL, \`createdBy\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`corrective_history\` ADD CONSTRAINT \`FK_528c89eda874bf5ab2affe2b7ac\` FOREIGN KEY (\`correctiveId\`) REFERENCES \`corrective\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`corrective_history\` ADD CONSTRAINT \`FK_845650fadc727dea615fd783d31\` FOREIGN KEY (\`currentStatus\`) REFERENCES \`current_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`corrective_history\` ADD CONSTRAINT \`FK_59f76105af9f859d16a53f6314f\` FOREIGN KEY (\`createdBy\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`corrective_history\` DROP FOREIGN KEY \`FK_59f76105af9f859d16a53f6314f\``);
        await queryRunner.query(`ALTER TABLE \`corrective_history\` DROP FOREIGN KEY \`FK_845650fadc727dea615fd783d31\``);
        await queryRunner.query(`ALTER TABLE \`corrective_history\` DROP FOREIGN KEY \`FK_528c89eda874bf5ab2affe2b7ac\``);
        await queryRunner.query(`DROP TABLE \`corrective_history\``);
    }

}
