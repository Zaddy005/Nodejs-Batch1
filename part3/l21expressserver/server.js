const express = require("express");
const app = express();
const PORT = 3000;


// app.get("/",(req,res)=>{
//     res.send("Hello World");
// });

// app.get("/about",(req,res)=>{
//     res.send("About Page");
// });

// app.listen(PORT,()=>{
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


// => exe 3 


// app.get("/",(req,res)=>{
//     const name = req.query.name || "student";
//     res.json({message:`Hello, ${name}`});
// });

// app.get("/user/:id",(req,res)=>{
//     res.send(`<h1>User Profile</h1><p>User ID: ${req.params.id}</p>`);
// });

// app.get("/products/:item/:id",(req,res)=>{
//     res.json({
//         item:req.params.item,
//         id:req.params.id,
//         info:`Showing product ${req.params.item} with ID ${req.params.id}`
//     })
// });

// app.listen(PORT,()=>{
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


// => exe 4
// home route
app.get("/",(req,res)=>{
    res.send('<h1>Home Page</h1><p>Welcome to our website!</p>');
});

// about route
app.get("/about",(req,res)=>{
    res.send("<h1>About Us</h1><p>This is the about page.</p>");
});

// redirect route to about page
app.get("/about-us",(req,res)=>{
    res.redirect("/about");
})

// 404 handler 
app.use((req,res,next)=>{
    res.sendFile('./views/404.html',{root:__dirname});
});

// app.get("/contact",(req,res)=>{
//     res.send("<h1>Contact Us</h1><p>Email");
// });


app.get("/user/:id",(req,res)=>{
    res.send(`<h1>User Profile</h1><p>User ID: ${req.params.id}</p>`);
});

app.get("/products/:item/:id",(req,res)=>{
    res.json({
        item:req.params.item,
        id:req.params.id,
        info:`Showing product ${req.params.item} with ID ${req.params.id}`
    })
});

//404 handler 
app.use((req,res)=>{
    res.status(404).send("<h1>404 -  Page Not Found </h1>");
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

// 13ES