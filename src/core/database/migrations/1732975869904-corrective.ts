import { MigrationInterface, QueryRunner } from "typeorm";

export class Corrective1732975869904 implements MigrationInterface {
    name = 'Corrective1732975869904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`corrective\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`description\` varchar(500) NOT NULL, \`next\` datetime NOT NULL, \`sendNotice\` tinyint NOT NULL, \`noticeDate\` datetime NULL, \`categoryId\` int NOT NULL, \`responsibleId\` int NOT NULL, \`currentStatus\` int NOT NULL, \`createdBy\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`corrective\` ADD CONSTRAINT \`FK_fcc28e0720290a2fb068e7d2a35\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`corrective\` ADD CONSTRAINT \`FK_48b2d8f4678c50943c7c13294d8\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`responsible\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`corrective\` ADD CONSTRAINT \`FK_f0434aeca94a7c8ef8eb65d766c\` FOREIGN KEY (\`currentStatus\`) REFERENCES \`current_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`corrective\` ADD CONSTRAINT \`FK_f8832b5b217acd3c9051848a19e\` FOREIGN KEY (\`createdBy\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`corrective\` DROP FOREIGN KEY \`FK_f8832b5b217acd3c9051848a19e\``);
        await queryRunner.query(`ALTER TABLE \`corrective\` DROP FOREIGN KEY \`FK_f0434aeca94a7c8ef8eb65d766c\``);
        await queryRunner.query(`ALTER TABLE \`corrective\` DROP FOREIGN KEY \`FK_48b2d8f4678c50943c7c13294d8\``);
        await queryRunner.query(`ALTER TABLE \`corrective\` DROP FOREIGN KEY \`FK_fcc28e0720290a2fb068e7d2a35\``);
        await queryRunner.query(`DROP TABLE \`corrective\``);
    }

}
