const { Schema, model } = require('mongoose');

const artworkSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    //for browsing
    // category: {
    //     type: String,
    //     required: true,
    // },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // relationship
    // should it be referencing user purchasing it/buyer_id ?
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],
    // TO DO: ADD MORE
});


//pre save hook that hashes password before saving to db
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

const Artwork = model('Artwork', artworkSchema);

module.exports = Artwork;
