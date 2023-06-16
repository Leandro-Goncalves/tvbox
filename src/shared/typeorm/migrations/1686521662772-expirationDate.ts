import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class expirationDate1686521662772 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "expirationDate",
        type: "timestamp",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "expirationDate");
  }
}
