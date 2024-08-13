import { Router } from "express";
import { checkJwtToken } from "../middlewares/jwtValidation.js";

const routePrefix = "/task";
const TaskRouter = Router();

TaskRouter.use(checkJwtToken);

TaskRouter.get(`${routePrefix}`, async (req, res) => {});

export { TaskRouter };
