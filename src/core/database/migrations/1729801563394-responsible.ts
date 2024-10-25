import { MigrationInterface, QueryRunner } from "typeorm";

export class Responsible1729801563394 implements MigrationInterface {
    name = 'Responsible1729801563394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`responsible\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`company\` varchar(150) NOT NULL, \`phoneNumber\` varchar(15) NOT NULL, \`email\` varchar(150) NOT NULL, \`contact\` varchar(50) NOT NULL, \`createdBy\` int NOT NULL, UNIQUE INDEX \`IDX_2b4b11e9c351d6766cbc966286\` (\`company\`), UNIQUE INDEX \`IDX_1ef4d4b9f7d276f1d27faded2b\` (\`phoneNumber\`), UNIQUE INDEX \`IDX_b4678f820a8f55842a8bb774b1\` (\`email\`), UNIQUE INDEX \`IDX_bd10fbb6eb9674a0451206255a\` (\`contact\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`frequency\` CHANGE \`type\` \`type\` enum ('DAILY', 'ONE_WEEK', 'TWO_WEEKS', 'THREE_WEEKS', 'ONE_MONTH', 'TWO_MONTHS', 'THREE_MONTHS', 'FOUR_MONTHS', 'FIVE_MONTHS', 'SIX_MONTHS', 'SEVEN_MONTHS', 'EIGHT_MONTHS', 'NINE_MONTHS', 'TEN_MONTHS', 'ELEVEN_MONTHS', 'ONE_YEAR', 'TWO_YEARS', 'THREE_YEARS', 'FOUR_YEARS', 'FIVE_YEARS', 'SIX_YEARS') NOT NULL DEFAULT 'SIX_MONTHS'`);
        await queryRunner.query(`ALTER TABLE \`frequency\` CHANGE \`type\` \`type\` enum ('DAILY', 'ONE_WEEK', 'TWO_WEEKS', 'THREE_WEEKS', 'ONE_MONTH', 'TWO_MONTHS', 'THREE_MONTHS', 'FOUR_MONTHS', 'FIVE_MONTHS', 'SIX_MONTHS', 'SEVEN_MONTHS', 'EIGHT_MONTHS', 'NINE_MONTHS', 'TEN_MONTHS', 'ELEVEN_MONTHS', 'ONE_YEAR', 'TWO_YEARS', 'THREE_YEARS', 'FOUR_YEARS', 'FIVE_YEARS', 'SIX_YEARS') NOT NULL DEFAULT 'SIX_MONTHS'`);
        await queryRunner.query(`ALTER TABLE \`responsible\` ADD CONSTRAINT \`FK_4204d9dd5d8019c1c22c44b60d0\` FOREIGN KEY (\`createdBy\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`responsible\` DROP FOREIGN KEY \`FK_4204d9dd5d8019c1c22c44b60d0\``);
        await queryRunner.query(`ALTER TABLE \`frequency\` CHANGE \`type\` \`type\` enum ('DAILY', 'ONE_WEEK', 'TWO_WEEKS', 'THREE_WEEKS', 'ONE_MONTH', 'TWO_MONTHS', 'THREE_MONTHS', 'FOUR_MONTHS', 'FIVE_MONTHS', 'SIX_MONTHS', 'SEVEN_MONTHS', 'EIGHT_MONTHS', 'NINE_MONTHS', 'TEN_MONTHS', 'ELEVEN_MONTHS', 'ONE_YEAR', 'TWO_YEARS', 'THREE_YEARS', 'FOUR_YEARS', 'FIVE_YEARS', 'SIX_YEARS') NOT NULL DEFAULT 'ONE_MONTH'`);
        await queryRunner.query(`ALTER TABLE \`frequency\` CHANGE \`type\` \`type\` enum ('DAILY', 'ONE_WEEK', 'TWO_WEEKS', 'THREE_WEEKS', 'ONE_MONTH', 'TWO_MONTHS', 'THREE_MONTHS', 'FOUR_MONTHS', 'FIVE_MONTHS', 'SIX_MONTHS', 'SEVEN_MONTHS', 'EIGHT_MONTHS', 'NINE_MONTHS', 'TEN_MONTHS', 'ELEVEN_MONTHS', 'ONE_YEAR', 'TWO_YEARS', 'THREE_YEARS', 'FOUR_YEARS', 'FIVE_YEARS', 'SIX_YEARS') NOT NULL DEFAULT 'ONE_MONTH'`);
        await queryRunner.query(`DROP INDEX \`IDX_bd10fbb6eb9674a0451206255a\` ON \`responsible\``);
        await queryRunner.query(`DROP INDEX \`IDX_b4678f820a8f55842a8bb774b1\` ON \`responsible\``);
        await queryRunner.query(`DROP INDEX \`IDX_1ef4d4b9f7d276f1d27faded2b\` ON \`responsible\``);
        await queryRunner.query(`DROP INDEX \`IDX_2b4b11e9c351d6766cbc966286\` ON \`responsible\``);
        await queryRunner.query(`DROP TABLE \`responsible\``);
    }

}
