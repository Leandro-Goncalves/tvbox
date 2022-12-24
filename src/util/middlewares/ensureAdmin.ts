import { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/users/repositories/typeorm/UsersRepository";
import { Socket } from "socket.io";

export async function ensureAdminSocket(socket: Socket, next: any) {
  const id = socket.data.sub;
  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    next(new Error("User isn't admin!"));
  }

  return next();
}

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user;
  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User isn't admin!");
  }

  return next();
}
