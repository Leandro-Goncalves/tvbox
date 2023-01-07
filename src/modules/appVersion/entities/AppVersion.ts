import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("appVersions")
class AppVersion {
  @PrimaryColumn()
  id: string;

  @Column()
  version: string;

  @Column()
  path: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { AppVersion };
