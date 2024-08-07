import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "./user.entity.js";

const UserService = {
  async register(name, email, password) {
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
};

export { UserService };
