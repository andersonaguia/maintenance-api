import { MigrationInterface, QueryRunner } from 'typeorm';

export class PreventiveHistory1731943514526 implements MigrationInterface {
  name = 'PreventiveHistory1731943514526';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`preventive_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`comments\` varchar(500) NULL, \`preventiveId\` int NOT NULL, \`currentStatus\` int NOT NULL, \`createdBy\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`preventive_history\` ADD CONSTRAINT \`FK_f07e08ba3bbf6f596f121816e51\` FOREIGN KEY (\`preventiveId\`) REFERENCES \`preventive\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`preventive_history\` ADD CONSTRAINT \`FK_e39df9c9642c83aca7aa7d85500\` FOREIGN KEY (\`currentStatus\`) REFERENCES \`current_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`preventive_history\` ADD CONSTRAINT \`FK_bdbf845e23aaf6cea0f6a97769d\` FOREIGN KEY (\`createdBy\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`preventive_history\` DROP FOREIGN KEY \`FK_bdbf845e23aaf6cea0f6a97769d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`preventive_history\` DROP FOREIGN KEY \`FK_e39df9c9642c83aca7aa7d85500\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`preventive_history\` DROP FOREIGN KEY \`FK_f07e08ba3bbf6f596f121816e51\``,
    );
    await queryRunner.query(`DROP TABLE \`preventive_history\``);
  }
}
