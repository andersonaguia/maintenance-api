import { MigrationInterface, QueryRunner } from "typeorm";

export class NoticesChange1733846383792 implements MigrationInterface {
    name = 'NoticesChange1733846383792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notices\` DROP FOREIGN KEY \`FK_42fc8be157755d59ef56297cf4b\``);
        await queryRunner.query(`ALTER TABLE \`notices\` CHANGE \`createdBy\` \`createdBy\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`notices\` ADD CONSTRAINT \`FK_42fc8be157755d59ef56297cf4b\` FOREIGN KEY (\`createdBy\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notices\` DROP FOREIGN KEY \`FK_42fc8be157755d59ef56297cf4b\``);
        await queryRunner.query(`ALTER TABLE \`notices\` CHANGE \`createdBy\` \`createdBy\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`notices\` ADD CONSTRAINT \`FK_42fc8be157755d59ef56297cf4b\` FOREIGN KEY (\`createdBy\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
