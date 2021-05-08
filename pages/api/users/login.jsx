import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nookies from 'nookies';

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import Settings from '../../../models/Settings';

const authorize = async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await User.findOne({ login });

    if (user) {
      const settings = await Settings.findOne({ user: user._id });
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d',
          });

          nookies.set({ req, res }, 'token', token, { httpOnly: true, path: '/' });

          res.status(200).json({ status: 'success', data: { user, settings, token } });
        } else {
          res.status(400).json({ status: 'error', error: 'Password is incorrect' });
        }
      });
    } else {
      res.status(400).json({ status: 'error', error: 'User doesn\'t exist' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
  case 'POST':
    return authorize(req, res);
  default:
    return res.status(404).json({ error: 'Not found' });
  }
};
