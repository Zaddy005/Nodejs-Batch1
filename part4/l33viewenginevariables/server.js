import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const port = 3000;

// Set EJS as view Engine
app.set("view engine", "ejs");

// Set View Folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views",path.join(__dirname,"views"));

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

// 404 ( note : that must be bottom line )
app.use((req,res,next)=>{
    res.status(404).render("404",{title:"404"});
});

app.listen(port, () => {
    console.log("Server running on http://localhost:" + port);
});

// <%=  %> = output value
// <%   %> = no output ( Logic Only )
