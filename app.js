const express = require("express");
let app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to DB");
}).catch(err=>{
console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);    
}

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Hi server is working properly");
});

// index route
app.get("/listings",async (req,res)=>{
   const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
});

// show route
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"My new Villa",
//         description:"By the beach",
//         price:12000,
//         location:"Calangute, Goa",
//         country:"India"
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Successfully saved");
// });

app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
});