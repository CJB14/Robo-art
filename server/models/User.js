const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Order = require('./Order');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  artworks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Artwork',
    },
  ],
  favoriteArtworks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Artwork',
    },
  ],
orders: [Order.schema]
});

// pre save hook that hashes password before saving to db
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// instance method that compares password that was input with the hashed password stored in the user db
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
