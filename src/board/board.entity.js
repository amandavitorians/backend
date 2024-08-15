import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user_creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  users_participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  tasks: [mongoose.Types.ObjectId],
});

const BoardModel = mongoose.model("Board", BoardSchema);

export { BoardModel };
