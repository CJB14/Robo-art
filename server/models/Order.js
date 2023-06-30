const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    artwork: {
      type: Schema.Types.ObjectId,
      ref: 'Artwork',
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // TO DO: ADD MORE
    purchaseDate: {
      type: Date,
      default: Date.now
    },
    
  });
  
const Order = model('Order', orderSchema);

module.exports = Order;