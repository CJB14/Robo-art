const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

const productSchema = new Schema({
    title: {
        type: String,
        //should the user select the title before or after the image is generated?
        // required: true,
        trim: true,
    },
    imageURL: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    //TO DO: EDIT CATEGORY MODEL, TYPEDEFS, RESOLVERS, QUERIES
    // category: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Category',
    // },
    
    //TO DO: ADD DATE CREATED
});

//day js virtual
productSchema.virtual('formattedArtworkDate').get(function () {
    return dayjs(this.date_created).format('YYYY-MM-DD');
  });

const Product = model('Product', productSchema);

module.exports = Product;
