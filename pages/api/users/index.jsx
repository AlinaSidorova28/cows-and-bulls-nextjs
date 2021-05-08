import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(201).json({ data: users });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
  case 'GET':
    return getUsers(req, res);
  default:
    return res.status(404).json({ error: 'Not found' });
  }
};
