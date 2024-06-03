import { Request, Response } from 'express';
import Contact from '../models/contact.model.js';
import { sendResponse } from '../helpers.js';

export const getAllContracts = async (req: Request, res: Response) => {
  const userId = req.user._id;

  const [contacts, count] = await Promise.all([
    Contact.find({ users: userId })
      .populate('users', 'name email')
      .populate('latestMessage', 'message isSeen')
      .populate('admin', 'name email'),
    Contact.countDocuments({ users: userId }),
  ]);

  sendResponse(res, 200, 'Success', { data: contacts, count });
};

export const createContact = async (req: Request, res: Response) => {
  const userId = req.user._id;

  const { newUserId, name = '' } = req.body;

  const existingContact = await Contact.findOne({
    users: { $all: [newUserId, userId] },
  });

  if (existingContact) {
    return res.status(400).json({ message: 'Contact already exists.' });
  }

  const newContact = new Contact({
    name,

    users: [userId, newUserId],
  });

  const savedContact = await newContact.save();

  sendResponse(res, 201, 'Success', savedContact);
};
