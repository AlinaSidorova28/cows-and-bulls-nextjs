import dbConnect from '../../../utils/dbConnect';
import Statistics from '../../../models/Statistics';
import User from '../../../models/User';

const updateStatistics = async (req, res) => {
  const userName = req.query.userId;
  const {
    difficulty,
    moves,
    number,
  } = req.body;

  try {
    const user = await User.findOne({ login: userName });
    const newStatistics = await Statistics.findOneAndUpdate(
      { user: user._id },
      {
        $push: {
          [difficulty]: {
            userName,
            moves,
            number,
          },
        },
      },
      { useFindAndModify: false },
    );

    if (newStatistics) {
      res.status(200).json({ status: 'success', statistics: newStatistics });
    } else {
      res.status(500).json({ status: 'error', error: 'Something went wrong' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteStatistics = async (req, res) => {
  const userName = req.query.userId;

  try {
    const user = await User.findOne({ login: userName });
    const newStatistics = await Statistics.findOneAndUpdate(
      { user: user._id },
      {
        $set: {
          easy: [],
          medium: [],
          hard: [],
        },
      },
      { useFindAndModify: false },
    );

    if (newStatistics) {
      res.status(200).json({ status: 'success', statistics: newStatistics });
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
    return updateStatistics(req, res);
  case 'DELETE':
    return deleteStatistics(req, res);
  default:
    return res.status(404).json({ error: 'Not found' });
  }
};
