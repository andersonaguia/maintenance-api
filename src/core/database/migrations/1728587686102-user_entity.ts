import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntity1728587686102 implements MigrationInterface {
    name = 'UserEntity1728587686102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`system_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(150) NOT NULL, \`occupation\` varchar(150) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(255) NOT NULL, \`salt\` varchar(255) NOT NULL, \`role\` enum ('admin', 'sindico', 'gerente', 'supervisor', 'usuario') NOT NULL DEFAULT 'usuario', \`active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_73dff187ed765e8403bf5fc911\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_73dff187ed765e8403bf5fc911\` ON \`system_users\``);
        await queryRunner.query(`DROP TABLE \`system_users\``);
    }

}
