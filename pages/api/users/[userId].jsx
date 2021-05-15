import mongoose from 'mongoose';

import dbConnect from '../../../utils/dbConnect';
import Settings from '../../../models/Settings';
import Statistics from '../../../models/Statistics';
import User from '../../../models/User';

const { ObjectId } = mongoose.Types.ObjectId;

const getUserDataById = async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findOne({ _id: userId });
    const settings = await Settings.findOne({ user: userId });
    const statistics = await Statistics.findOne({ user: userId });
    res.status(200).json({
      status: 'success', settings, user, statistics,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Something went wrong' });
  }
};

const getUserDataByName = async (req, res) => {
  const userName = req.query.userId;
  try {
    const user = await User.findOne({ login: userName });
    const settings = await Settings.findOne({ user: user._id });
    const statistics = await Statistics.findOne({ user: user._id });
    res.status(200).json({
      status: 'success', settings, user, statistics,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Something went wrong' });
  }
};

export default async (req, res) => {
  await dbConnect();

  const { userId } = req.query;

  switch (req.method) {
  case 'GET':
    return ObjectId.isValid(userId)
      ? getUserDataById(req, res)
      : getUserDataByName(req, res);
  default:
    return res.status(404).json({ error: 'Not found' });
  }
};
