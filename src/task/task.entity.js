import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: String,
  user_creator: mongoose.Types.ObjectIdv,
  users_participants: [mongoose.Types.ObjectId],
  tasks: [mongoose.Types.ObjectId],
  status_available: [mongoose.Types.ObjectId],
});

const TaskModel = mongoose.model("Task", TaskSchema);

export { TaskModel };
