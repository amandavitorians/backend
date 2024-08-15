import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: Number, default: 0, enum: [0, 1, 2] },
  board_id: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  user_responsible: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: String,
});

const TaskModel = mongoose.model("Task", TaskSchema);

export { TaskModel };
