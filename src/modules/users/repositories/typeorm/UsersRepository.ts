import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@modules/users/entities/User";
import { getRepository, Repository, UpdateResult } from "typeorm";
import { IUsersRepository } from "../IUsersRepository";
import { add } from "date-fns";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async create({ id, name, password }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      id,
      name,
      password,
      expirationDate: new Date(),
    });

    await this.repository.save(user);
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }
  async findByName(name: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { name },
    });

    return user;
  }
  async findAll(): Promise<User[]> {
    const user = await this.repository.find({
      where: { isAdmin: false },
    });

    return user;
  }

  async delete(id: string): Promise<boolean> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id })
      .execute();
    return true;
  }

  async updateIsActive(id: string, isActive: boolean): Promise<UpdateResult> {
    const updateResult = await this.repository.update(id, { isActive });

    return updateResult;
  }
  async updateIsBlocked(id: string, isBlocked: boolean): Promise<UpdateResult> {
    const updateResult = await this.repository.update(id, { isBlocked });

    return updateResult;
  }
  async updateAppName(id: string, appName: string): Promise<UpdateResult> {
    const updateResult = await this.repository.update(id, {
      appName,
      date: appName ? new Date() : undefined,
    });

    return updateResult;
  }

  async updateExpirationDate(
    id: string,
    months?: number,
    days?: number
  ): Promise<void> {
    const { expirationDate } = await this.repository.findOne(id);

    await this.repository.update(id, {
      expirationDate: add(expirationDate, { months, days }),
    });
  }
}

export { UsersRepository };
