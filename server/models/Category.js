const { Schema, model } = require('mongoose');

const Category = {
    id: {
      type: Number,
      primaryKey: true,
    },
    name: {
      type: String,
      required: true,
    },
    parentCategoryId: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  };
  
  module.exports = Category;

// const categorySchema = new Schema({
//     categoryName: {
//         type: String,
//         required: true,
//     },
//     products: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: 'Product',
//         },
//     ],
// });

// const Category = model('Category', categorySchema);

// module.exports = Category;
