import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { PetsType } from '../pets/entities/enums';

export class CreatePetsTable1716758482370 implements MigrationInterface {
  name = 'CreatePetsTable1716758482370';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pets',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'color',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'height',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['dog', 'cat', 'other'],
            isNullable: false,
            default: "'dog'", // Valor predeterminado corregido
          },
          {
            name: 'rating',
            type: 'tinyint',
            unsigned: true,
            isNullable: false,
            default: 3,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'RESTRICT',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pets');
  }
}
