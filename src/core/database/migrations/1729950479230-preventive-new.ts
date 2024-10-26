import { MigrationInterface, QueryRunner } from "typeorm";

export class PreventiveNew1729950479230 implements MigrationInterface {
    name = 'PreventiveNew1729950479230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP FOREIGN KEY \`FK_064d631d536074e92a1d7797fe6\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP FOREIGN KEY \`FK_2657dcabb5aefc705e224212058\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP FOREIGN KEY \`FK_40ee2d1b6a0e01461bc40c7aba0\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP FOREIGN KEY \`FK_45f03d621010f518500449dedf5\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP FOREIGN KEY \`FK_784aaa20bc64128fe8f150ffee9\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`next\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`last\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`sendNotice\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`categoryId\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`frequencyId\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`responsibleId\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`currentStatus\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`createdBy\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`description\` varchar(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`next\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`last\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`sendNotice\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`categoryId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`frequencyId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`responsibleId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`currentStatus\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`createdBy\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD CONSTRAINT \`FK_45f03d621010f518500449dedf5\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD CONSTRAINT \`FK_064d631d536074e92a1d7797fe6\` FOREIGN KEY (\`frequencyId\`) REFERENCES \`frequency\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD CONSTRAINT \`FK_784aaa20bc64128fe8f150ffee9\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`responsible\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD CONSTRAINT \`FK_40ee2d1b6a0e01461bc40c7aba0\` FOREIGN KEY (\`currentStatus\`) REFERENCES \`current_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD CONSTRAINT \`FK_2657dcabb5aefc705e224212058\` FOREIGN KEY (\`createdBy\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP FOREIGN KEY \`FK_2657dcabb5aefc705e224212058\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP FOREIGN KEY \`FK_40ee2d1b6a0e01461bc40c7aba0\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP FOREIGN KEY \`FK_784aaa20bc64128fe8f150ffee9\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP FOREIGN KEY \`FK_064d631d536074e92a1d7797fe6\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP FOREIGN KEY \`FK_45f03d621010f518500449dedf5\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`createdBy\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`currentStatus\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`responsibleId\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`frequencyId\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`categoryId\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`sendNotice\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`last\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`next\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`createdBy\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`currentStatus\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`responsibleId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`frequencyId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`categoryId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`sendNotice\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`last\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`next\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD \`description\` varchar(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD CONSTRAINT \`FK_784aaa20bc64128fe8f150ffee9\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`responsible\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD CONSTRAINT \`FK_45f03d621010f518500449dedf5\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD CONSTRAINT \`FK_40ee2d1b6a0e01461bc40c7aba0\` FOREIGN KEY (\`currentStatus\`) REFERENCES \`current_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD CONSTRAINT \`FK_2657dcabb5aefc705e224212058\` FOREIGN KEY (\`createdBy\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`preventive\` ADD CONSTRAINT \`FK_064d631d536074e92a1d7797fe6\` FOREIGN KEY (\`frequencyId\`) REFERENCES \`frequency\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
