import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialSchema1785800491128 implements MigrationInterface {
    name = 'CreateInitialSchema1785800491128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ticket_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`action\` varchar(50) NOT NULL, \`field_name\` varchar(100) NULL, \`previous_value\` text NULL, \`new_value\` text NULL, \`ticket_id\` int NOT NULL, \`changed_by_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket_priorities\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(150) NOT NULL, \`slug\` varchar(100) NOT NULL, \`color\` varchar(20) NOT NULL, \`level\` int NOT NULL, \`display_order\` int NOT NULL DEFAULT '0', \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_ebd87f1e1f79f9201a7efc9cbf\` (\`name\`), UNIQUE INDEX \`IDX_44ea2d554b2a0171185b713e1e\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket_statuses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(150) NOT NULL, \`slug\` varchar(100) NOT NULL, \`color\` varchar(20) NOT NULL, \`display_order\` int NOT NULL DEFAULT '0', \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8824cbe7f8fa87764c35d511db\` (\`name\`), UNIQUE INDEX \`IDX_3ed4f3da7bcdc3ff2df60a94a3\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tickets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`status_id\` int NOT NULL, \`priority_id\` int NOT NULL, \`created_by_id\` int NOT NULL, \`assigned_to_id\` int NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket_comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`ticket_id\` int NOT NULL, \`user_id\` int NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(150) NOT NULL, \`email\` varchar(255) NOT NULL, \`password_hash\` varchar(255) NOT NULL, \`role_id\` int NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(150) NOT NULL, \`slug\` varchar(100) NOT NULL, \`description\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), UNIQUE INDEX \`IDX_881f72bac969d9a00a1a29e107\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ticket_history\` ADD CONSTRAINT \`fk_ticket_history_ticket\` FOREIGN KEY (\`ticket_id\`) REFERENCES \`tickets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_history\` ADD CONSTRAINT \`fk_ticket_history_changed_by_user\` FOREIGN KEY (\`changed_by_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tickets\` ADD CONSTRAINT \`fk_tickets_status\` FOREIGN KEY (\`status_id\`) REFERENCES \`ticket_statuses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tickets\` ADD CONSTRAINT \`fk_tickets_priority\` FOREIGN KEY (\`priority_id\`) REFERENCES \`ticket_priorities\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tickets\` ADD CONSTRAINT \`fk_tickets_created_by_user\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tickets\` ADD CONSTRAINT \`fk_tickets_assigned_to_user\` FOREIGN KEY (\`assigned_to_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_comments\` ADD CONSTRAINT \`fk_ticket_comments_ticket\` FOREIGN KEY (\`ticket_id\`) REFERENCES \`tickets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_comments\` ADD CONSTRAINT \`fk_ticket_comments_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`fk_users_role\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`fk_users_role\``);
        await queryRunner.query(`ALTER TABLE \`ticket_comments\` DROP FOREIGN KEY \`fk_ticket_comments_user\``);
        await queryRunner.query(`ALTER TABLE \`ticket_comments\` DROP FOREIGN KEY \`fk_ticket_comments_ticket\``);
        await queryRunner.query(`ALTER TABLE \`tickets\` DROP FOREIGN KEY \`fk_tickets_assigned_to_user\``);
        await queryRunner.query(`ALTER TABLE \`tickets\` DROP FOREIGN KEY \`fk_tickets_created_by_user\``);
        await queryRunner.query(`ALTER TABLE \`tickets\` DROP FOREIGN KEY \`fk_tickets_priority\``);
        await queryRunner.query(`ALTER TABLE \`tickets\` DROP FOREIGN KEY \`fk_tickets_status\``);
        await queryRunner.query(`ALTER TABLE \`ticket_history\` DROP FOREIGN KEY \`fk_ticket_history_changed_by_user\``);
        await queryRunner.query(`ALTER TABLE \`ticket_history\` DROP FOREIGN KEY \`fk_ticket_history_ticket\``);
        await queryRunner.query(`DROP INDEX \`IDX_881f72bac969d9a00a1a29e107\` ON \`roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`ticket_comments\``);
        await queryRunner.query(`DROP TABLE \`tickets\``);
        await queryRunner.query(`DROP INDEX \`IDX_3ed4f3da7bcdc3ff2df60a94a3\` ON \`ticket_statuses\``);
        await queryRunner.query(`DROP INDEX \`IDX_8824cbe7f8fa87764c35d511db\` ON \`ticket_statuses\``);
        await queryRunner.query(`DROP TABLE \`ticket_statuses\``);
        await queryRunner.query(`DROP INDEX \`IDX_44ea2d554b2a0171185b713e1e\` ON \`ticket_priorities\``);
        await queryRunner.query(`DROP INDEX \`IDX_ebd87f1e1f79f9201a7efc9cbf\` ON \`ticket_priorities\``);
        await queryRunner.query(`DROP TABLE \`ticket_priorities\``);
        await queryRunner.query(`DROP TABLE \`ticket_history\``);
    }

}
