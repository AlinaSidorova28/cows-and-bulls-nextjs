import dbConnect from '../../../utils/dbConnect';
import Settings from '../../../models/Settings';
import User from '../../../models/User';

const updateSettings = async (req, res) => {
  const userName = req.query.userId;
  const {
    sound,
    music,
    language,
    difficulty,
  } = req.body;

  try {
    const user = await User.findOne({ login: userName });
    const newSettings = await Settings.findOneAndUpdate(
      { user: user._id },
      {
        $set: {
          sound, music, language, difficulty,
        },
      },
      { useFindAndModify: false },
    );

    if (newSettings) {
      res.status(200).json({ status: 'success', settings: newSettings });
    } else {
      res.status(500).json({ status: 'error', error: 'Something went wrong' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
  case 'PUT':
    return updateSettings(req, res);
  default:
    return res.status(404).json({ error: 'Not found' });
  }
};
