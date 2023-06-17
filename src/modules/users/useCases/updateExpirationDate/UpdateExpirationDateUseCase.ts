import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
@injectable()
class UpdateExpirationDateUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, months?: number, days?: number) {
    await this.usersRepository.updateExpirationDate(id, months, days);
  }
}

export { UpdateExpirationDateUseCase };
