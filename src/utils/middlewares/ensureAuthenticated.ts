import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@configs/auth";
import { AppError } from "@shared/errors/AppError";
import { Socket } from "socket.io";
import { container } from "tsyringe";
import { ActionsUser } from "../../routesSocket/actions/user";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticatedSocket(socket: Socket, next: any) {
  if (socket.handshake.query && socket.handshake.query.token) {
    verify(
      socket.handshake.query.token as string,
      auth.secret_token,
      function (err, decoded: { sub: string }) {
        if (err || !decoded) return next(new Error("Authentication error"));

        const actionsUser = container.resolve(ActionsUser);
        actionsUser.findById(decoded.sub).then((user) => {
          if (!user) return next(new Error("User not found!"));
          socket.data = { id: decoded.sub };
          next();
        });
      }
    );
  } else {
    next(new Error("Authentication error"));
  }
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    req.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Token invalid", 401);
  }
}
