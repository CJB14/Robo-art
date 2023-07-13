const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

const productSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  imageURL: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

// dayjs virtual
productSchema.virtual('formattedArtworkDate').get(function () {
  return dayjs(this.date_created).format('YYYY-MM-DD');
});

const Product = model('Product', productSchema);

module.exports = Product;
