import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  username: string;
  password: string;
  role: "admin" | "user";
}

const userSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

async function getUsers(): Promise<IUser[]> {
  const users: IUser[] = await User.find({});
  return users;
}

async function deleteUsers(): Promise<void> {
  await User.deleteMany({ role: { $ne: "admin" } });
}

export { User, getUsers, deleteUsers };
