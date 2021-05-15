import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nookies from 'nookies';

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import Settings from '../../../models/Settings';
import Statistics from '../../../models/Statistics';

const register = async (req, res) => {
  const { login, password } = req.body;
  try {
    const candidate = await User.findOne({ login });
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ login, password: hashedPassword });
    const settings = new Settings({ user: user._id });
    const statistics = new Statistics({ user: user._id });

    if (candidate) {
      res.status(400).json({ status: 'error', error: 'Such user already exists' });
    } else {
      await user.save();
      await settings.save();
      await statistics.save();

      const token = jwt.sign({ userId: candidate ? candidate._id : user._id },
        process.env.JWT_SECRET_KEY, {
          expiresIn: '7d',
        });

      nookies.set({ req, res }, 'token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
      nookies.set({ req, res }, 'userName', user.login, { path: '/', maxAge: 60 * 60 * 24 * 7 });

      res.status(201).json({ status: 'success', data: { token } });
    }
  } catch (error) {
    res.status(500).json({ error });
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
