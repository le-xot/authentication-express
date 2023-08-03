import { User } from "../repositories/user.repository";
import bcrypt from "bcrypt";

async function login(username: string, password: string) {
  const user = await User.findOne({ username: username });

  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return false;
}

export { login };
