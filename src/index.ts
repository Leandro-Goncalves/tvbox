import { isDev } from "@utils/enviroment";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({
  path: path.join(__dirname, "../", `.env.${isDev() ? "dev" : "prod"}`),
});

import "reflect-metadata";
import "@shared/container";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import Cors from "cors";
const app = express();
import http from "http";
const server = http.createServer(app);

import { RouterSocket } from "./routesSocket";
import { router } from "./routes";

import createConnection from "@shared/typeorm";
import "./cronActions";

import { AppError } from "@shared/errors/AppError";

createConnection();

app.use(express.json());
app.use(Cors());
app.use(express.urlencoded({ extended: false }));
RouterSocket(server);
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});
export { server };
