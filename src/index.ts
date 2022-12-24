import "reflect-metadata";
import "@shared/container";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import Cors from "cors";
const app = express();
const http = require("http").Server(app);

import { router } from "./routes";

import createConnection from "@shared/typeorm";

import { AppError } from "@shared/errors/AppError";

createConnection();

app.use(express.json());
app.use(Cors());
app.use(express.urlencoded({ extended: false }));
import "./routesSocket";
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
export { http };
