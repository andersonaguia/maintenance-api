import { MigrationInterface, QueryRunner } from "typeorm";

export class Frequency1729798007827 implements MigrationInterface {
    name = 'Frequency1729798007827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`frequency\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`type\` enum ('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20') NOT NULL DEFAULT '4', \`createdBy\` int NOT NULL, UNIQUE INDEX \`IDX_c030414006c0bc3919ce0c0e1e\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`frequency\` ADD CONSTRAINT \`FK_4bf77baf8d18ecb715d586ec4bf\` FOREIGN KEY (\`createdBy\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`frequency\` DROP FOREIGN KEY \`FK_4bf77baf8d18ecb715d586ec4bf\``);
        await queryRunner.query(`DROP INDEX \`IDX_c030414006c0bc3919ce0c0e1e\` ON \`frequency\``);
        await queryRunner.query(`DROP TABLE \`frequency\``);
    }

}
