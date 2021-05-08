import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const settingsSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  sound: {
    type: Boolean,
    required: true,
    default: true,
  },
  music: {
    type: Boolean,
    required: true,
    default: true,
  },
  language: {
    type: String,
    required: true,
    default: 'en',
    enum: ['en', 'ru'],
  },
  difficulty: {
    type: String,
    required: true,
    default: 'medium',
    enum: ['easy', 'medium', 'hard'],
  },
});

export default mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
