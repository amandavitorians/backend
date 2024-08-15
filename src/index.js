import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { AuthRouter } from "./auth/auth.controller.js";
import { UserRouter } from "./user/user.controller.js";
import { BoardRouter } from "./board/board.controller.js";
import { TaskRouter } from "./task/task.controller.js";
import { UserService } from "./user/user.service.js";
import { UserModel } from "./user/user.entity.js";
import { connectToDatabase } from "./utils/database.utils.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(AuthRouter);
app.use(BoardRouter);
app.use(TaskRouter);
app.use(UserRouter);

connectToDatabase().then(({ connectionSuccess }) => {
  app.listen(process.env.BACKEND_PORT, async () => {
    if (connectionSuccess) {
      !(await UserModel.exists()) &&
        (await UserService.register(
          "admin",
          "admin@admin.com",
          "admin",
          true
        ).then((response) =>
          console.log(
            `
              A default administrator user has been registered, please change your credentials later
              login: admin@admin.com
              password: admin
              `
          )
        ));
    }

    console.log(
      `Application listening on port ${process.env.BACKEND_PORT} ${
        connectionSuccess ? "and successfully connected to database" : ""
      }`
    );
  });
});
