import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddAppNameCollum1671893075116 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("users", [
      new TableColumn({
        name: "appName",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "date",
        type: "timestamp",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("users", ["appName", "date"]);
  }
}
