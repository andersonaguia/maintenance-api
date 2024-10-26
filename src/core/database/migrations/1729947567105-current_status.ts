import { MigrationInterface, QueryRunner } from "typeorm";

export class CurrentStatus1729947567105 implements MigrationInterface {
    name = 'CurrentStatus1729947567105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`current_status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(150) NOT NULL, \`createdBy\` int NOT NULL, UNIQUE INDEX \`IDX_8507b8898bd8075cb1abe68c9a\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`current_status\` ADD CONSTRAINT \`FK_ea2a4584570019167c1559cb0c4\` FOREIGN KEY (\`createdBy\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`current_status\` DROP FOREIGN KEY \`FK_ea2a4584570019167c1559cb0c4\``);
        await queryRunner.query(`DROP INDEX \`IDX_8507b8898bd8075cb1abe68c9a\` ON \`current_status\``);
        await queryRunner.query(`DROP TABLE \`current_status\``);
    }

}
