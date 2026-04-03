import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import morgan from "morgan";
import mongoose from "mongoose";

const app = express();
const port = 3000;

// Set EJS as view Engine
app.set("view engine", "ejs");

// Set View Folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware and static files
app.use(morgan("dev"));
app.use(express.static("public"));  // http://localhost:3000/style.css
app.use(express.urlencoded({extended:true})); // ***** HTML from submit for post/put
app.use(express.json());// for JOSN requests

// mongoDB Atlas URI
const cluster = "cluster0";
const dbName = "nodejsbatch2";
const dbUser = "zaddy";
const dbPassword = "dZPLu8yZwGpULzB4";
// const dbURL = `mongodb+srv://${dbUser}:${dbPassword}@${cluster}.lzogzuk.mongodb.net/?appName=Cluster0`;

const dbURL = `mongodb+srv://${dbUser}:${dbPassword}@${cluster}.lzogzuk.mongodb.net/?appName=Cluster0`;


mongoose.connect(dbURL)
    .then(()=>{
        console.log("connected to mongodb");
    })
    .catch(err=>{
        process.exit(1);
        console.log(err)
    });

// Database Middleware
app.use((req,res,next)=>{
    // console.log("ReadyStage = ",mongoose.connection);
    // console.log("ReadyStage = ",mongoose.connection["_readyState"]);
    if(mongoose.connection.readyState !== 1){
        return res.status(503).send("Database not connected. Please try again later.");
    }
    next()
});


// Shutdown ( SIGINT = Signal Interupt , raised when you press Ctrl + c )
process.on("SIGINT",async ()=>{
    console.log("SIGINT");
    console.log("MongoDB connection closed");
    await mongoose.connection.close();
    process.exit(0);
});

// GET route
app.get("/",(req,res)=>{
    // res.render("index");
    // res.render("index",{title:"Home Page"});

    const posts = [
        {title:"post one",subtitle:"this is new post one",body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry"},
        {title:"post two",subtitle:"this is new post two",body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry"},
        {title:"post three",subtitle:"this is new post three",body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry"},
    ];

    res.render("index",{posts:posts,title:"Home Page"});

});

app.get("/about",(req,res)=>{
    res.render("about",{title:"About"});
});

app.get("/about-us",(req,res)=>{
   res.redirect("/about",{title:"About"});
});

app.get("/posts/create",(req,res)=>{
   res.render("create",{title:"Create Page"});
});

app.post("/createuser",(req,res)=>{
    console.log(req.body);
});

// 404 ( note : that must be bottom line )
app.use((req,res,next)=>{
    res.status(404).render("404",{title:"404"});
});


app.listen(port, () => {
    console.log("Server running on http://localhost:" + port);
});

// <%=  %> = output value
// <%   %> = no output ( Logic Only )

// middleware for html form
// app.use(express.urlencoded({extended:true}));
// html -> form (default = URL encorded format )
// eg form = name=su%su&age=20&city="Yangon"

// if u not use middleware express.urlencoded
// app.post("/createuser",(req,res)=>{
//     console.log(req.body); // undefined
// });

// if u use middleware express.urlencoded
// app.post("/createuser",(req,res)=>{
//     console.log(req.body); // obj
// });


// => extended:true
    // nested objects or arrays support

    // after parse
    // {
    //     user:{
    //         name:"su su",
    //         age:20
    //     }
    //     hobbiess:['reading','coding']
    // }

// => extended:false
    // no nested objects

// 29RD