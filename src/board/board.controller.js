import { Router } from "express";
import { checkJwtToken } from "../middlewares/jwtValidation.js";

const routePrefix = "/board";
const BoardRouter = Router();

BoardRouter.use(checkJwtToken);

BoardRouter.get(`${routePrefix}`, async (req, res) => {});

export { BoardRouter };
