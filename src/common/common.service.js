import bcrypt from "bcrypt";
import { UserModel } from "../user/user.entity.js";
import { BoardModel } from "../board/board.entity.js";
import { TaskModel } from "../task/task.entity.js";

const K = { N_USERS: 5, N_BOARDS: 5 };

async function checkIfExistsUsers() {
  return (await UserModel.countDocuments()) > 2;
}

async function createUsers() {
  let usersArray = [];

  for (let i = 0; i < K.N_USERS; i++) {
    const user = await UserModel.create({
      name: `teste${i}`,
      is_admin: false,
      email: `teste_${i}@email.com`,
      password: await bcrypt.hash("123456", await bcrypt.genSalt(12)),
    });
    usersArray.push(user);
  }
  return usersArray;
}

async function createBoards(userArray) {
  let boardArray = [];

  const userIdArray = userArray && userArray.map((e) => e._id.toString());

  for (let i = 0; i < K.N_BOARDS; i++) {
    const board = await BoardModel.create({
      title: `title_${i}`,
      users_participants: userIdArray,
      user_creator: userIdArray[0],
    });
    boardArray.push(board);
  }

  return boardArray;
}

async function createTasks(boardArray) {
  let taskArray = [];

  const boardIdArray = boardArray && boardArray.map((e) => e._id.toString());

  for (let i = 0; i < K.N_BOARDS; i++) {
    const board = await TaskModel.create({
      title: `title_${i}`,
      description: `lorem ipsum dolor sit amet`,
      board_id: boardIdArray[0],
      user_responsible: boardArray[0].users_participants[0].toString(),
    });
    taskArray.push(board);
  }

  console.log(taskArray);
  return taskArray;
}

const CommonService = {
  async populateData() {
    if (await checkIfExistsUsers()) {
      return {
        message:
          "No populate needed, Already exists documents in batabase. If you want to repopulate, delete the data first",
      };
    }

    return await createTasks(await createBoards(await createUsers()));
  },
};

export { CommonService };
