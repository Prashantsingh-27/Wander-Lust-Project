const mongoose = require("mongoose");
const Review = require("./review");
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
        default:"https://unsplash.com/photos/a-small-building-with-a-lot-of-potted-plants-in-front-of-it-L_5u4iweMGg",
        set: (v) => v===""? "https://unsplash.com/photos/a-small-building-with-a-lot-of-potted-plants-in-front-of-it-L_5u4iweMGg": v ,
    },
    price: Number,
    location: String,
    country: String,
    reviews :[
        {
            type: Schema.Types.ObjectId,
            ref : "Review",
        },
    ],
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
          await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;