import { User } from "../repositories/user.repository";
import bcrypt from "bcrypt";

async function register(username: string, password: string) {
  const user = await User.findOne({ username });

  if (user === null) {
    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      password: hash,
    });

    return newUser;
  }

  return false;
}

export { register };
