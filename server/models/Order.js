const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

const orderSchema = new Schema({
  artwork: {
    type: Schema.Types.ObjectId,
    ref: 'Artwork',
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  purchaseDate: {
    type: String,
    default: () => dayjs().format(),
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  contentWidth: {
    type: Number,
    required: true,
  },
  contentHeight: {
    type: Number,
    required: true,
  },
  payment: {
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    paymentFailureReason: {
      type: String,
      default: '',
    },
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  billingAddress: {
    type: String,
    required: true,
  },
});

orderSchema.virtual('formattedOrderDate').get(function () {
  return dayjs(this.date_created).format('YYYY-MM-DD HH:mm:ss');
});

const Order = model('Order', orderSchema);

module.exports = Order;