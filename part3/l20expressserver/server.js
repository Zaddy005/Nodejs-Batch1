const express = require("express");
const app = express();
const port = 3000;

// app.get("/",(req,res)=>{
//     res.send("Hello World");
// });

// => exe2
// app.get("/",(req,res)=>{
//     res.send("<p>Index Page</p>");
// });
//
// app.get("/about",(req,res)=>{
//     res.send("<p>About Page</p>");
// });

// => exe 3
// app.get("/",(req,res)=>{
//     const name = req.query.name || "student";
//     res.json({message: `Hello ${name}!`});
// });

// => exe 4
app.get("/",(req,res)=>{
    res.send("<h1>Home Page</h1><p> Welcome to our website</p>");
});

app.get("/about",(req,res)=>{
    res.send("<h1>About Page</h1><p> Welcome to our website</p>");
});

app.get("/contact",(req,res)=>{
    res.send("<h1>Contact Page</h1><p> Welcome to our website</p>");
});


// route with parameters
app.get("/user/:id",(req,res)=>{
    res.send(`<h1>user profile</h1><p> ID : ${req.params.id}</p>`);
});

// route with multi parameters
app.get("/products/:item/:id",(req,res)=>{
    res.json({
        item:req.params.item,
        productid:req.params.item,
        info:`Showing product ${req.params.id} from item ${req.params.item}`
    })
});

// 404 handler
app.use((req,res,next   )=>{
    res.status(404).send("<h1>404 - Page Not Found")
});

app.listen(port,()=>{
   console.log("Server listening on http://localhost:"+port);
});