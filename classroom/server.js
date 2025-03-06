const express = require("express");
let app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

const sessionOption = {secret:"mysupersecretstring",resave:false , saveUninitialized:true}
app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/register",(req,res)=>{
    let {name="Username"} = req.query;
    req.session.name = name;
    if(name=== "Username"){
        req.flash("error","User is not registered ");
    }else{
        req.flash("success","User registered successful");
    }
    res.redirect('/hello');
});

app.get("/hello",(req,res)=>{
    
    res.render("page.ejs", {name: req.session.name });
})

// app.get("/reqcount", (req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1 ;
//     }
    
//     res.send(`You sent a request ${req.session.count} times`)
// });

// app.get("/test", (req,res)=>{
//     res.send("test successful!");
// });


app.listen(3000,()=>{
console.log("Server is working")
})