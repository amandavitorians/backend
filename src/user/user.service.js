import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "./user.entity.js";
import { BoardModel } from "../board/board.entity.js";

const UserService = {
  async register(name, email, password, is_admin) {
    if (!name || !email || !password) {
      throw new Error("Missing required fields");
    }

    const userIfExists = await UserModel.findOne({ email });

    if (userIfExists) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      is_admin,
      email,
      password: hashedPassword,
    });

    const jwtToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );

    return { user, jwtToken };
  },

  async login(email, password) {
    if (!email || !password) {
      throw new Error("Missing required fields");
    }

    const userIfExists = await UserModel.findOne({ email });
    if (!userIfExists) {
      throw new Error("User does not exists");
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userIfExists.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }

    const jwtToken = jwt.sign(
      {
        id: userIfExists._id,
      },
      process.env.JWT_SECRET
    );

    return { user: userIfExists, jwtToken };
  },

  async getAllByBoardId(board_id) {
    const boardIfExist = await BoardModel.findById(board_id).populate({
      path: "users_participants",
      select: "name",
    });

    if (!boardIfExist) {
      throw new Error("Board not found");
    }

    const users = boardIfExist.users_participants;

    return users;
  },

  async getAll() {
    const users = await UserModel.find();

    if (!users) {
      throw new Error("Board not found");
    }

    return users;
  },

  async updateUser(id, name, email, password, user_auth_id) {
    const userAuthenticated = await UserModel.findById(user_auth_id);
    const userIfExists = await UserModel.findById(id);
    if (!userIfExists) {
      throw new Error("User does not exists");
    }

    if (
      userIfExists._id.toString() !== user_auth_id &&
      !userAuthenticated?.is_admin
    ) {
      throw new Error("User not allowed");
    }

    const newUserInfo = {
      name,
      email,
    };

    if (password) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      newUserInfo.password = hashedPassword;
    }

    const userUpdated = await UserModel.updateOne({ _id: id }, newUserInfo, {
      new: true,
    });

    return userUpdated;
  },

  async deleteUser(id) {
    return await UserModel.findOneAndDelete({ _id: id });
  },
};

export { UserService };
