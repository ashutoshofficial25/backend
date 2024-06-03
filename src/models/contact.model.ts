import mongoose, { Schema, model } from 'mongoose';
import { IUser } from './user.model.js';

export interface IContactSchema {
  name: string;
  imgUrl?: string;
  isGroup: boolean;
  users: IUser[];
  latestMessage: mongoose.Types.ObjectId;
  admin: mongoose.Types.ObjectId;
}

const ContactSchema = new Schema({
  name: { type: String },
  imgUrl: { type: String },
  isGroup: {
    type: Boolean,
    default: false,
  },
  users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  latestMessage: {
    type: mongoose.Types.ObjectId,
    ref: 'Message',
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Contact = model<IContactSchema>('Contact', ContactSchema);

export default Contact;
