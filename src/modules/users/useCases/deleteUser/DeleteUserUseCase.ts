import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<any> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError("User not found!");
    }

    const result = await this.usersRepository.delete(id);

    return result;
  }
}

export { DeleteUserUseCase };
