import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  avatar?: string;
  query?: string;
  password?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  query: String,
  password: String,
});

const User = model<IUser>("User", userSchema);

export default User;
