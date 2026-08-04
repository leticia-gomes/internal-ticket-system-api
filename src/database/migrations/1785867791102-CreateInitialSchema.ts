import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialSchema1785867791102 implements MigrationInterface {
    name = 'CreateInitialSchema1785867791102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(150) NOT NULL, \`email\` varchar(255) NOT NULL, \`password_hash\` varchar(255) NOT NULL, \`role\` enum ('ADMIN', 'AGENT', 'REQUESTER') NOT NULL DEFAULT 'AGENT', \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`action\` varchar(50) NOT NULL, \`field_name\` varchar(100) NULL, \`previous_value\` text NULL, \`new_value\` text NULL, \`ticket_id\` int NOT NULL, \`changed_by_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tickets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`status\` enum ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED') NOT NULL DEFAULT 'OPEN', \`priority\` enum ('LOW', 'MEDIUM', 'HIGH', 'URGENT') NOT NULL DEFAULT 'MEDIUM', \`created_by_id\` int NOT NULL, \`assigned_to_id\` int NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket_comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`ticket_id\` int NOT NULL, \`user_id\` int NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ticket_history\` ADD CONSTRAINT \`fk_ticket_history_ticket\` FOREIGN KEY (\`ticket_id\`) REFERENCES \`tickets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_history\` ADD CONSTRAINT \`fk_ticket_history_changed_by_user\` FOREIGN KEY (\`changed_by_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tickets\` ADD CONSTRAINT \`fk_tickets_created_by_user\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tickets\` ADD CONSTRAINT \`fk_tickets_assigned_to_user\` FOREIGN KEY (\`assigned_to_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_comments\` ADD CONSTRAINT \`fk_ticket_comments_ticket\` FOREIGN KEY (\`ticket_id\`) REFERENCES \`tickets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_comments\` ADD CONSTRAINT \`fk_ticket_comments_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket_comments\` DROP FOREIGN KEY \`fk_ticket_comments_user\``);
        await queryRunner.query(`ALTER TABLE \`ticket_comments\` DROP FOREIGN KEY \`fk_ticket_comments_ticket\``);
        await queryRunner.query(`ALTER TABLE \`tickets\` DROP FOREIGN KEY \`fk_tickets_assigned_to_user\``);
        await queryRunner.query(`ALTER TABLE \`tickets\` DROP FOREIGN KEY \`fk_tickets_created_by_user\``);
        await queryRunner.query(`ALTER TABLE \`ticket_history\` DROP FOREIGN KEY \`fk_ticket_history_changed_by_user\``);
        await queryRunner.query(`ALTER TABLE \`ticket_history\` DROP FOREIGN KEY \`fk_ticket_history_ticket\``);
        await queryRunner.query(`DROP TABLE \`ticket_comments\``);
        await queryRunner.query(`DROP TABLE \`tickets\``);
        await queryRunner.query(`DROP TABLE \`ticket_history\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
