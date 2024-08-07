import { Router } from "express";
import { checkJwtToken } from "../middlewares/jwtValidation.js";

const routePrefix = "/user";
const UserRouter = Router();

UserRouter.use(checkJwtToken);

UserRouter.get(`${routePrefix}`, async (req, res) => {});

export { UserRouter };
