import { BoardModel } from "./board.entity.js";

const BoardService = {
  async createBoard(title, users_participants, user_creator) {
    const newBoard = await BoardModel.create({
      title,
      users_participants,
      user_creator,
    });
    return newBoard;
  },

  async getAll(userId) {
    const boardsParticipating = await BoardModel.find({
      $or: [{ user_creator: userId }, { users_participants: userId }],
    });

    return boardsParticipating;
  },

  async getBoardDetails(id) {
    const boardDetails = await BoardModel.findById(id);

    return boardDetails;
  },

  async updateBoard(id, title, users_participants, user_creator) {
    const updatedBoard = await BoardModel.findByIdAndUpdate(
      id,
      {
        title,
        users_participants,
        user_creator,
      },
      { new: true }
    );
    return updatedBoard;
  },

  async deleteBoard(id) {
    return await BoardModel.findOneAndDelete({ _id: id });
  },
};

export { BoardService };
