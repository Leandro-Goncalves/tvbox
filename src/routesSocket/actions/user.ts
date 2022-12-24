import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { UpdateResult } from "typeorm";
import { User } from "@modules/users/entities/User";

@injectable()
class ActionsUser {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async isBLocked(id: string): Promise<boolean> {
    const users = await this.usersRepository.findById(id);

    return users.isBlocked;
  }

  async updateIsActive(id: string, isActive: boolean): Promise<UpdateResult> {
    const users = await this.usersRepository.updateIsActive(id, isActive);

    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    return user;
  }

  async updateIsBlocked(id: string, isBlock): Promise<UpdateResult> {
    const users = await this.usersRepository.updateIsBlocked(id, isBlock);

    return users;
  }

  async updateAppName(id: string, appName: string): Promise<UpdateResult> {
    const users = await this.usersRepository.updateAppName(id, appName);

    return users;
  }
}

export { ActionsUser };
