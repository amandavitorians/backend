import { Router } from "express";
import { checkJwtToken } from "../middlewares/jwtValidation.js";
import { BoardService } from "./board.service.js";

const routePrefix = "/board";
const BoardRouter = Router();

BoardRouter.use(checkJwtToken);

BoardRouter.get(`${routePrefix}`, async (req, res) => {
  const { currentUserId } = req.query;
  try {
    const allBoardsParticipating = await BoardService.getAll(currentUserId);
    res.status(200).json(allBoardsParticipating);
  } catch (error) {
    res.status(500).json({ message: "Board search failed" });
  }
});

BoardRouter.get(`${routePrefix}/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const boardDetails = await BoardService.getBoardDetails(id);
    res.status(200).json(boardDetails);
  } catch (error) {
    res.status(500).json({ message: "Board search failed" });
  }
});

BoardRouter.post(`${routePrefix}`, async (req, res) => {
  const { title, users_participants, user_creator } = req.body;
  try {
    const newBoard = await BoardService.createBoard(
      title,
      users_participants,
      user_creator
    );
    res.status(201).json(newBoard);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Board creation failed" });
  }
});

BoardRouter.post(`${routePrefix}/:id`, async (req, res) => {
  const { title, users_participants, user_creator } = req.body;
  const { id } = req.params;
  try {
    const updatedBoard = await BoardService.updateBoard(
      id,
      title,
      users_participants,
      user_creator
    );
    res.status(201).json(updatedBoard);
  } catch (error) {
    res.status(500).json({ message: "Board update failed" });
  }
});

BoardRouter.delete(`${routePrefix}/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    await BoardService.deleteBoard(id);
    res.status(200).json({ message: "Board deleted" });
  } catch (error) {
    res.status(500).json({ message: "Board deletion failed" });
  }
});

export { BoardRouter };
