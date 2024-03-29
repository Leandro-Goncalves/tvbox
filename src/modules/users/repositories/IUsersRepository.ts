import { UpdateResult } from "typeorm";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<void>;
  findById(id: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  findByName(name: string): Promise<User | undefined>;
  delete(id: string): Promise<boolean>;
  updateIsActive(id: string, isActive: boolean): Promise<UpdateResult>;
  updateIsBlocked(id: string, isActive: boolean): Promise<UpdateResult>;
  updateAppName(id: string, appName: string): Promise<UpdateResult>;
  updateExpirationDate(id: string, months?: number, days?: number): Promise<void>;
}

export { IUsersRepository };
