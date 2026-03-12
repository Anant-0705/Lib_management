const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
      trim: true,
    },
    genre: {
      type: String,
      required: [true, 'Genre/Category is required'],
      trim: true,
    },
    publisher: {
      type: String,
      required: [true, 'Publisher is required'],
      trim: true,
    },
    publicationYear: {
      type: Number,
      trim: true,
    },
    totalCopies: {
      type: Number,
      required: [true, 'Total copies is required'],
      min: [1, 'Total copies must be a positive number'],
    },
    availableCopies: {
      type: Number,
      default: function () {
        return this.totalCopies;
      },
      min: [0, 'Available copies cannot be negative'],
    },
    shelfLocation: {
      type: String,
      trim: true,
    },
    bookType: {
      type: String,
      enum: ['Reference', 'Circulating'],
      default: 'Circulating',
    },
    status: {
      type: String,
      enum: ['Available', 'Checked Out'],
      default: 'Available',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Book', bookSchema);
