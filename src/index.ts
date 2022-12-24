import "reflect-metadata";
import "@shared/container";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import Cors from "cors";
const app = express();
const http = require("http").Server(app);

import { router } from "routes";

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

// interface IDevice {
//   id: string;
//   name: string;
//   state: string;
//   isBlocked: boolean;
//   currentAppOpem?: {
//     appName: string;
//     date: number;
//   };
// }

// let devicesList: IDevice[] = [
//   {
//     id: "0",
//     name: "Leandro Gonçalves",
//     state: "deactivate",
//     isBlocked: false,
//   },
//   {
//     id: "1",
//     name: "John Doe",
//     state: "deactivate",
//     isBlocked: false,
//   },
//   {
//     id: "2",
//     name: "Jane Doe",
//     state: "deactivate",
//     isBlocked: false,
//   },
// ];

// let usersList = [
//   {
//     user: "vargem",
//     password: "130971",
//   },
// ];

// const admin = io.of("/admin");

// admin
//   .use((socket, next) =>
//     authenticateSocket(
//       socket as SocketAuthenticated,
//       next,
//       "mySuperSecretPassword"
//     )
//   )
//   .on("connection", (socket) => {
//     console.log("a admin connected");

//     socket.on("listDevices", (callback) => {
//       return callback(devicesList);
//     });

//     socket.on("rebootUser", (deviceId) => {
//       io.to(deviceId).emit("reboot");
//     });

//     socket.on("blockUser", (deviceId) => {
//       const device = devicesList.find((device) => device.id === deviceId);
//       if (!device) {
//         return;
//       }
//       device.isBlocked = !device.isBlocked;
//       io.to(deviceId).emit("reboot");
//       admin.emit("updateDevices", devicesList);
//     });

//     socket.on("disconnect", () => {
//       console.log("admin disconnected");
//     });
//   });

// io.use((socket, next) =>
//   authenticateSocket(
//     socket as SocketAuthenticated,
//     next,
//     "mySuperSecretPasswordUser"
//   )
// ).on("connection", (s) => {
//   const socket = s as SocketAuthenticated;
//   console.log("a user connected", socket.user.id);

//   socket.join(socket.user.id);
//   const myDevice = devicesList.find((d) => d.id == socket.user.id);
//   if (!myDevice) {
//     return;
//   }

//   if (myDevice.isBlocked) {
//     socket.emit("reboot");
//     return;
//   }

//   myDevice.state = "active";

//   admin.emit("updateDevices", devicesList);

//   socket.on("openApp", (appName) => {
//     console.log(appName);
//     if (appName) {
//       myDevice.currentAppOpem = {
//         appName,
//         date: Date.now(),
//       };
//     } else {
//       myDevice.currentAppOpem = undefined;
//     }

//     admin.emit("updateDevices", devicesList);
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//     myDevice.state = "deactivate";
//     myDevice.currentAppOpem = undefined;
//     admin.emit("updateDevices", devicesList);
//   });
// });

// app.post("/login", (req, res) => {
//   const { user, password } = req.body;
//   console.log(user, password);

//   if (!user || !password) {
//     res.json({});
//     return;
//   }

//   const myUser = usersList.find(
//     (u) => u.user === user && u.password === password
//   );

//   if (!myUser) {
//     res.json({});
//     return;
//   }

//   const token = jwt.sign({ id: Math.random() }, "mySuperSecretPasswordUser");

//   res.json({ token });
//   return;
// });

export { http };
