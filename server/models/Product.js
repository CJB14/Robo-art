const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    imageURL: {
        //could be changed if need be
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // category: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Category',
    // },
});

//day js virtual
productSchema.virtual('formattedArtworkDate').get(function () {
    return dayjs(this.date_created).format('YYYY-MM-DD');
  });

const Product = model('Product', productSchema);

module.exports = Product;
