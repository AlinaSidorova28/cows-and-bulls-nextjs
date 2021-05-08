import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

const getUserById = async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findOne({ _id: userId });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
  case 'GET':
    return getUserById(req, res);
  default:
    return res.status(404).json({ error: 'Not found' });
  }
};
