import { User } from "@modules/users/entities/User";
import { container } from "tsyringe";

import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersControllerSocket {
  static async handle(): Promise<Omit<User, "password">[]> {
    const createUserUseCase = container.resolve(ListUsersUseCase);

    const users = await createUserUseCase.execute();

    return users;
  }
}

export { ListUsersControllerSocket };
