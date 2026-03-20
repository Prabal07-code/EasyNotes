const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: 'text',
    },
    content: {
      type: String,
      required: true,
      index: 'text',
    },
    tags: {
      type: [String],
      default: [],
    },
    color: {
      type: String,
      default: '#ffffff',
    },
    pinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

noteSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('Note', noteSchema);
