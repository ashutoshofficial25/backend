import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  avatar?: string;
  query?: string;
  password?: string;
  contacts?: Schema.Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  query: String,
  password: String,
  contacts: { type: Schema.Types.ObjectId, ref: 'User' },
});

const User = model<IUser>('User', userSchema);

export default User;
