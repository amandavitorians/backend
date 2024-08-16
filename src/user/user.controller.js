import { Router } from "express";
import { checkJwtToken } from "../middlewares/jwtValidation.js";
import { UserService } from "./user.service.js";
import jwt from "jsonwebtoken";

const routePrefix = "/user";
const UserRouter = Router();

UserRouter.use(checkJwtToken);

UserRouter.get(`${routePrefix}/:board_id`, async (req, res) => {
  const { board_id } = req.params;
  try {
    const allBoardsParticipating = await UserService.getAllByBoardId(board_id);
    res.status(200).json(allBoardsParticipating);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Users in board search failed" });
  }
});

UserRouter.get(`${routePrefix}`, async (req, res) => {
  try {
    const users = await UserService.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Users search failed" });
  }
});

UserRouter.post(`${routePrefix}/:id`, async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;
  const authHeader = req.headers["authorization"];
  const token = authHeader && jwt.decode(authHeader?.split(" ")[1]);

  const user_auth_id = token.id;

  try {
    const updatedUser = await UserService.updateUser(
      id,
      name,
      email,
      password,
      user_auth_id
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User update failed" });
  }
});

UserRouter.delete(`${routePrefix}/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    await UserService.deleteUser(id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "User deletion failed" });
  }
});

export { UserRouter };
