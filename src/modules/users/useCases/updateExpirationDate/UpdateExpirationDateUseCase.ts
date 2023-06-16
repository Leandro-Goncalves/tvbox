import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
@injectable()
class UpdateExpirationDateUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, months: number) {
    await this.usersRepository.updateExpirationDate(id, months);
  }
}

export { UpdateExpirationDateUseCase };
