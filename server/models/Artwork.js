const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

const artworkSchema = new Schema({
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
});

// virtual that defines relationship between user and artwork
artworkSchema.virtual('artist', {
    ref: 'User',
    localField: 'user',
    foreignField: '_id',
    justOne: true,
});

//day js virtual
artworkSchema.virtual('formattedArtworkDate').get(function () {
    return dayjs(this.date_created).format('YYYY-MM-DD');
  });

const Artwork = model('Artwork', artworkSchema);

module.exports = Artwork;
