import express, {application} from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import {fileURLToPath} from "url";
import path from "path";

const app = express();
const port = 3000;


app.use(cors());
app.use(morgan("dev"));
app.use(helmet())

//useful for POST/PUT
app.use(express.json());
// custom middleware



// Get - Retrieve all items
app.get('/api/items',(req,res)=>{
    res.json([
        {id:1,name:"Item 1"},
        {id:2,name:"Item 2"},
        {id:3,name:"Item 3"},
        {id:4,name:"Item 4"},
        {id:5,name:"Item 5"}
    ]);
});

app.get("api/items/:id",(req,res)=>{
    const item = {
        id:req.params.id,
        name:`Item ${req.params.id}`,
        price:10
    };
    res.json(item);
});

// Post - Create new item
app.post("/api/items",express.json(),(req,res)=>{
    const newItem = {
        id:Date.now(),
        name:req.body.name,
        price:req.body.price
    };

    res.status(201).json(newItem);
});


// Put - Update item
app.put("/api/items/:id",(req,res)=>{
    const updateitem = {
        id:parseInt(req.params.id),
        name:req.body.name,
        price:req.body.price
    }
    res.json(updateitem);
});


app.get("/api/requestinfo",(req,res)=>{
    const requestinfo = {
        method:req.method, // "GET"
        url:req.url, // "/api/requestinfo?hello=asd"
        path:req.path, // "/api/requestinfo"
        query:req.query, // {"hello": "asd"},
        params:req.params, // {}
        headers:req.headers, // {
                                // "user-agent": "PostmanRuntime/7.49.0",
                                // "accept": "*/*",
                                // "postman-token": "85456f4f-7425-433f-8442-93457a64d416",
                                // "host": "localhost:3000",
                                // "accept-encoding": "gzip, deflate, br",
                                // "connection": "keep-alive"
                            // },
        ip:req.ip, // "::1"
        hostname:req.hostname, // "localhost"
        protocol:req.protocol, // "http"
        secure:req.secure, // false
    }

   res.json(requestinfo);

});

// Setting headers (curl -i http://localhost:3000/api/headers )
app.get("/api/headers",(req,res)=>{
   res.send("Header set");
});

// text/plain                  - plain text
// text/html                   - HTML page
// text/css                    - CSS
// application/javascript      - JS
// application/pdf             - PDF file
// application/json            - JSON data
// image/png                   - PNG image
// text/html                   - HTML page


app.get("/api/serach",(req,res)=>{
    const {q,page=1,limit=10} = req.query;
    if(!q){
        return res.status(404).json({
            error:"Query parameter is required"
        });
    }

    res.json({
        query:q,
        curpage:parseInt(page),
        limit:parseInt(limit)
    });
});

console.log(import.meta.url);
const filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filepath);

app.get("/api/response",(req,res)=>{
    // res.send("Hello Berlin");

    // res.json({message:"Hello Berlin"});
    // res.status(200).json({city:"Berlin"});

    // res.sendFile('./views/index.ejs'); // error , path must be absolute
    // res.sendFile("./views/index.ejs",{root:__dirname}); // error , not common js
    // res.sendFile(path.join(__dirname,"views","index.ejs"));

    res.redirect("/aboutus");

});

app.get("/aboutus",(req,res)=>{
   res.send("This is About Us Page");
});

app.listen(port, () => {
    console.log("Server running on port: " + port);
});

 // ipv4 130.454.454.545
// ipv6 ::1


// 17HT
// 19OS