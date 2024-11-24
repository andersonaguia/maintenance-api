import { MigrationInterface, QueryRunner } from "typeorm";

export class FrequencyUpdate1732217706294 implements MigrationInterface {
    name = 'FrequencyUpdate1732217706294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_c030414006c0bc3919ce0c0e1e\` ON \`frequency\``);
        await queryRunner.query(`ALTER TABLE \`frequency\` CHANGE \`type\` \`name\` enum ('DAILY', 'ONE_WEEK', 'TWO_WEEKS', 'THREE_WEEKS', 'ONE_MONTH', 'TWO_MONTHS', 'THREE_MONTHS', 'FOUR_MONTHS', 'FIVE_MONTHS', 'SIX_MONTHS', 'SEVEN_MONTHS', 'EIGHT_MONTHS', 'NINE_MONTHS', 'TEN_MONTHS', 'ELEVEN_MONTHS', 'ONE_YEAR', 'TWO_YEARS', 'THREE_YEARS', 'FOUR_YEARS', 'FIVE_YEARS', 'SIX_YEARS') NOT NULL DEFAULT 'SIX_MONTHS'`);
        await queryRunner.query(`ALTER TABLE \`frequency\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`frequency\` ADD \`name\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`frequency\` ADD UNIQUE INDEX \`IDX_0cbf793fef1353890f31d1455c\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`frequency\` DROP INDEX \`IDX_0cbf793fef1353890f31d1455c\``);
        await queryRunner.query(`ALTER TABLE \`frequency\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`frequency\` ADD \`name\` enum ('DAILY', 'ONE_WEEK', 'TWO_WEEKS', 'THREE_WEEKS', 'ONE_MONTH', 'TWO_MONTHS', 'THREE_MONTHS', 'FOUR_MONTHS', 'FIVE_MONTHS', 'SIX_MONTHS', 'SEVEN_MONTHS', 'EIGHT_MONTHS', 'NINE_MONTHS', 'TEN_MONTHS', 'ELEVEN_MONTHS', 'ONE_YEAR', 'TWO_YEARS', 'THREE_YEARS', 'FOUR_YEARS', 'FIVE_YEARS', 'SIX_YEARS') NOT NULL DEFAULT 'SIX_MONTHS'`);
        await queryRunner.query(`ALTER TABLE \`frequency\` CHANGE \`name\` \`type\` enum ('DAILY', 'ONE_WEEK', 'TWO_WEEKS', 'THREE_WEEKS', 'ONE_MONTH', 'TWO_MONTHS', 'THREE_MONTHS', 'FOUR_MONTHS', 'FIVE_MONTHS', 'SIX_MONTHS', 'SEVEN_MONTHS', 'EIGHT_MONTHS', 'NINE_MONTHS', 'TEN_MONTHS', 'ELEVEN_MONTHS', 'ONE_YEAR', 'TWO_YEARS', 'THREE_YEARS', 'FOUR_YEARS', 'FIVE_YEARS', 'SIX_YEARS') NOT NULL DEFAULT 'SIX_MONTHS'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_c030414006c0bc3919ce0c0e1e\` ON \`frequency\` (\`type\`)`);
    }

}
