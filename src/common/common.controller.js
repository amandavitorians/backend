import { Router } from "express";
import { checkJwtToken } from "../middlewares/jwtValidation.js";
import { CommonService } from "./common.service.js";

const CommonRouter = Router();

CommonRouter.use(checkJwtToken);

CommonRouter.get(`/install`, async (req, res) => {
  try {
    const response = await CommonService.populateData();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Data populate failed" });
  }
});

export { CommonRouter };
