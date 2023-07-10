const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

const orderSchema = new Schema({
  products: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  // buyer: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
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
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  payment: {
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
      //required: true
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
  orderStatus: {
    type: String,
      enum: ['na', 'iniated', 'pending', 'shipped'],
      default: 'na',
  }
},
{
  toJSON: {
    getters: true,
  },
  id: false,
}
);

orderSchema.virtual('formattedOrderDate').get(function () {
  return dayjs(this.date_created).format('YYYY-MM-DD HH:mm:ss');
});

const Order = model('Order', orderSchema);

module.exports = Order;