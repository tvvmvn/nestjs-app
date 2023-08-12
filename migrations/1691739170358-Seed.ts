import { MigrationInterface, QueryRunner } from "typeorm"

export class Seed1691739170358 implements MigrationInterface {
  // typeorm migration:run
  public async up(queryRunner: QueryRunner): Promise<void> {}

  // typeorm migration:revert
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
