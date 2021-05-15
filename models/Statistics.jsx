import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

// { userName: 'alina28', moves: 6, number: '4503' }
const statisticsSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  easy: {
    type: [Object],
    required: true,
    default: [],
  },
  medium: {
    type: [Object],
    required: true,
    default: [],
  },
  hard: {
    type: [Object],
    required: true,
    default: [],
  },
});

export default mongoose.models.Statistics || mongoose.model('Statistics', statisticsSchema);
