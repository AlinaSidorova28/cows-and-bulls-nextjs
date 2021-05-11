import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nookies from 'nookies';

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import Settings from '../../../models/Settings';

const register = async (req, res) => {
  const { login, password } = req.body;
  try {
    const candidate = await User.findOne({ login });
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ login, password: hashedPassword });
    const settings = new Settings({ user: user._id });

    if (candidate) {
      res.status(400).json({ status: 'error', error: 'Such user already exists' });
    } else {
      await user.save();
      await settings.save();

      const token = jwt.sign({ userId: candidate ? candidate._id : user._id },
        process.env.JWT_SECRET_KEY, {
          expiresIn: '7d',
        });

      nookies.set({ req, res }, 'token', token, { httpOnly: true, path: '/' });

      res.status(201).json({ status: 'success', data: { user, settings, token } });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
  case 'POST':
    return register(req, res);
  default:
    return res.status(404).json({ error: 'Not found' });
  }
};
