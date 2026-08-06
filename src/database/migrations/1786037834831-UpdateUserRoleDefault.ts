import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserRoleDefault1786037834831 implements MigrationInterface {
    name = 'UpdateUserRoleDefault1786037834831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tickets\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('ADMIN', 'AGENT', 'REQUESTER') NOT NULL DEFAULT 'REQUESTER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('ADMIN', 'AGENT', 'REQUESTER') NOT NULL DEFAULT 'AGENT'`);
        await queryRunner.query(`ALTER TABLE \`tickets\` ADD \`deleted_at\` datetime(6) NULL`);
    }

}
