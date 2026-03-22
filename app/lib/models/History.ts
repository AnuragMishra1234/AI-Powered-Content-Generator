import mongoose from 'mongoose';

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    toolType: {
      type: String,
      enum: ['text', 'poster', 'resume', 'website'],
      required: true,
    },
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    creditsUsed: {
      type: Number,
      default: 10,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Add index for faster queries
historySchema.index({ userId: 1, createdAt: -1 });

export default mongoose.models.History ||
  mongoose.model('History', historySchema);
