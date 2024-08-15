const TaskService = {
  async createTask(title, description, board_id, user_responsible) {
    if (!title) {
      throw new Error("Title is required");
    }

    const boardIfExist = await BoardModel.findById(board_id);
    const userIfExist = await UserModel.findById(user_responsible);

    if (!boardIfExist) {
      throw new Error("Board not found");
    }
    if (user_responsible && !userIfExist) {
      throw new Error("User not found");
    }

    const newTask = await TaskModel.create({
      title,
      description,
      board_id,
      user_responsible,
    });
    return newTask;
  },

  async getAllByboardId(board_id) {
    const boardIfExist = await BoardModel.findById(board_id);

    if (!boardIfExist) {
      throw new Error("Board not found");
    }

    const tasks = await TaskModel.find({ board_id }).populate({
      path: "user_responsible",
      select: "name",
    });

    return tasks;
  },

  async getDetails(id) {
    const taskDetails = await TaskModel.findById(id).populate({
      path: "user_responsible",
      select: "name",
    });

    if (!taskDetails) {
      throw new Error("Task not found");
    }

    return taskDetails;
  },

  async updateTask(id, title, description, board_id, user_responsible) {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        board_id,
        user_responsible,
      },
      { new: true }
    );
    return updatedTask;
  },

  async deleteTask(id) {
    return await TaskModel.findOneAndDelete({ _id: id });
  },
};

export { TaskService };
