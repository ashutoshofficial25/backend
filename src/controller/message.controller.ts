import { Request, Response } from 'express';
import Message from '../models/message.model.js';
import { sendResponse } from '../helpers.js';
import Contact from '../models/contact.model.js';

export const sendMessage = async (req: Request, res: Response) => {
  const { userId, contactId, message } = req.body;

  const newMessage = await Message.create({
    from: req.user._id,
    to: userId,
    contactId,
    message,
  });

  await Contact.findOneAndUpdate(
    { _id: contactId },
    { latestMessage: newMessage._id }
  );

  sendResponse(res, 201, 'Success', newMessage);
};

export const getMessages = async (req: Request, res: Response) => {
  const contactId = req.params?.contactId;

  await Message.findOneAndUpdate(
    { contactId, isSeen: false },
    { isSeen: true }
  );

  const messages = await Message.find({ contactId })
    .populate('from', 'name')
    .populate('to', 'name');

  sendResponse(res, 201, 'Success', messages);
};
