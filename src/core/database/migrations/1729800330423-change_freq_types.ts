import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeFreqTypes1729800330423 implements MigrationInterface {
    name = 'ChangeFreqTypes1729800330423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`frequency\` CHANGE \`type\` \`type\` enum ('DAILY', 'ONE_WEEK', 'TWO_WEEKS', 'THREE_WEEKS', 'ONE_MONTH', 'TWO_MONTHS', 'THREE_MONTHS', 'FOUR_MONTHS', 'FIVE_MONTHS', 'SIX_MONTHS', 'SEVEN_MONTHS', 'EIGHT_MONTHS', 'NINE_MONTHS', 'TEN_MONTHS', 'ELEVEN_MONTHS', 'ONE_YEAR', 'TWO_YEARS', 'THREE_YEARS', 'FOUR_YEARS', 'FIVE_YEARS', 'SIX_YEARS') NOT NULL DEFAULT 'SIX_MONTHS'`);
        await queryRunner.query(`ALTER TABLE \`frequency\` CHANGE \`type\` \`type\` enum ('DAILY', 'ONE_WEEK', 'TWO_WEEKS', 'THREE_WEEKS', 'ONE_MONTH', 'TWO_MONTHS', 'THREE_MONTHS', 'FOUR_MONTHS', 'FIVE_MONTHS', 'SIX_MONTHS', 'SEVEN_MONTHS', 'EIGHT_MONTHS', 'NINE_MONTHS', 'TEN_MONTHS', 'ELEVEN_MONTHS', 'ONE_YEAR', 'TWO_YEARS', 'THREE_YEARS', 'FOUR_YEARS', 'FIVE_YEARS', 'SIX_YEARS') NOT NULL DEFAULT 'ONE_MONTH'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`frequency\` CHANGE \`type\` \`type\` enum ('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20') NOT NULL DEFAULT '4'`);
        await queryRunner.query(`ALTER TABLE \`frequency\` CHANGE \`type\` \`type\` enum ('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20') NOT NULL DEFAULT '4'`);
    }

}
