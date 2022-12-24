import { User } from "@modules/users/entities/User";

export const removePasswordToUser = (user: User): Omit<User, "password"> => {
  const newUser = { ...user };
  delete newUser.password;

  return newUser;
};
