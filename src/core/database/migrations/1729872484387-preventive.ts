import { MigrationInterface, QueryRunner } from "typeorm";

export class Preventive1729872484387 implements MigrationInterface {
    name = 'Preventive1729872484387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`preventive\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`description\` varchar(500) NOT NULL, \`sendNotice\` tinyint NOT NULL, \`noticeDate\` datetime NOT NULL, \`noticeWasSent\` tinyint NOT NULL, \`categoryId\` int NOT NULL, \`frequencyId\` int NOT NULL, \`responsibleId\` int NOT NULL, \`createdBy\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD CONSTRAINT \`FK_45f03d621010f518500449dedf5\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD CONSTRAINT \`FK_064d631d536074e92a1d7797fe6\` FOREIGN KEY (\`frequencyId\`) REFERENCES \`frequency\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD CONSTRAINT \`FK_784aaa20bc64128fe8f150ffee9\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`responsible\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD CONSTRAINT \`FK_2657dcabb5aefc705e224212058\` FOREIGN KEY (\`createdBy\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP FOREIGN KEY \`FK_2657dcabb5aefc705e224212058\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP FOREIGN KEY \`FK_784aaa20bc64128fe8f150ffee9\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP FOREIGN KEY \`FK_064d631d536074e92a1d7797fe6\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP FOREIGN KEY \`FK_45f03d621010f518500449dedf5\``);
        await queryRunner.query(`DROP TABLE \`preventive\``);
    }

}
