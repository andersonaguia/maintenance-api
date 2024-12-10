import { MigrationInterface, QueryRunner } from "typeorm";

export class Notices1733846237827 implements MigrationInterface {
    name = 'Notices1733846237827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`sendingDate\` datetime NOT NULL, \`wasSent\` tinyint NOT NULL, \`preventiveId\` int NULL, \`correctiveId\` int NULL, \`createdBy\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notices\` ADD CONSTRAINT \`FK_6c6986f394faad77b770498a4cd\` FOREIGN KEY (\`preventiveId\`) REFERENCES \`preventive\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notices\` ADD CONSTRAINT \`FK_246105d26fa83355ee40aba6dcf\` FOREIGN KEY (\`correctiveId\`) REFERENCES \`corrective\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notices\` ADD CONSTRAINT \`FK_42fc8be157755d59ef56297cf4b\` FOREIGN KEY (\`createdBy\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notices\` DROP FOREIGN KEY \`FK_42fc8be157755d59ef56297cf4b\``);
        await queryRunner.query(`ALTER TABLE \`notices\` DROP FOREIGN KEY \`FK_246105d26fa83355ee40aba6dcf\``);
        await queryRunner.query(`ALTER TABLE \`notices\` DROP FOREIGN KEY \`FK_6c6986f394faad77b770498a4cd\``);
        await queryRunner.query(`DROP TABLE \`notices\``);
    }
}
