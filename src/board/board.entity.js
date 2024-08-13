import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  title: String,
  user_creator: mongoose.Types.ObjectIdv,
  users_participants: [mongoose.Types.ObjectId],
  tasks: [mongoose.Types.ObjectId],
  status_available: [mongoose.Types.ObjectId],
});

const BoardModel = mongoose.model("Board", BoardSchema);

export { BoardModel };
