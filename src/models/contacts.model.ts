import { Schema, model } from 'mongoose';

interface IContact {
  account: Schema.Types.ObjectId;
  users: Schema.Types.ObjectId[];
}

const ContactSchema = new Schema({
  account: { type: Schema.Types.ObjectId, ref: 'User' },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Contact = model<IContact>('Contact', ContactSchema);

export default Contact;
