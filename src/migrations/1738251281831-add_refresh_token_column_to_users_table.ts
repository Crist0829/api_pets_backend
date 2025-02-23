import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTokenColumnToUsersTable1738251281831 implements MigrationInterface {
    name = 'AddRefreshTokenColumnToUsersTable1738251281831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pets\` DROP FOREIGN KEY \`FK_4ddf2615c9d24b5be6d26830b4b\``);
        await queryRunner.query(`DROP INDEX \`UQ_97672ac88f789774dd47f7c8be3\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`pet_images\` DROP COLUMN \`verified\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`refresh_token\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pet_images\` CHANGE \`id\` \`id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pet_images\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`pet_images\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`pet_images\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`pets\` CHANGE \`breed\` \`breed\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pets\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`pets\` ADD \`type\` enum ('dog', 'cat', 'other') NOT NULL DEFAULT 'dog'`);
        await queryRunner.query(`ALTER TABLE \`pets\` DROP COLUMN \`rating\``);
        await queryRunner.query(`ALTER TABLE \`pets\` ADD \`rating\` smallint UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`pets\` ADD CONSTRAINT \`FK_4ddf2615c9d24b5be6d26830b4b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pets\` DROP FOREIGN KEY \`FK_4ddf2615c9d24b5be6d26830b4b\``);
        await queryRunner.query(`ALTER TABLE \`pets\` DROP COLUMN \`rating\``);
        await queryRunner.query(`ALTER TABLE \`pets\` ADD \`rating\` tinyint UNSIGNED NOT NULL DEFAULT '3'`);
        await queryRunner.query(`ALTER TABLE \`pets\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`pets\` ADD \`type\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`pets\` CHANGE \`breed\` \`breed\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`pet_images\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`pet_images\` ADD \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`pet_images\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`pet_images\` CHANGE \`id\` \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`refresh_token\``);
        await queryRunner.query(`ALTER TABLE \`pet_images\` ADD \`verified\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`UQ_97672ac88f789774dd47f7c8be3\` ON \`users\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`pets\` ADD CONSTRAINT \`FK_4ddf2615c9d24b5be6d26830b4b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
