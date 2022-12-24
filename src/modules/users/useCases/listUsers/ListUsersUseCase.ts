import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { User } from "@modules/users/entities/User";
import { removePasswordToUser } from "@utils/removePasswordToUser";
@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<Omit<User, "password">[]> {
    const users = await this.usersRepository.findAll();

    return users.map(removePasswordToUser);
  }
}

export { ListUsersUseCase };
