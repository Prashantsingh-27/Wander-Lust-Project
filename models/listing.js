const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        require: true,
    },
    description:{
        type: String,
    },
    image:{
        type: String,
        set: (v) => v===""? "https://unsplash.com/photos/a-small-building-with-a-lot-of-potted-plants-in-front-of-it-L_5u4iweMGg": v ,
    },
    price:{
        type: Number,
    },
    location:{
        type: String,
    },
    country:{
        type: String,
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;