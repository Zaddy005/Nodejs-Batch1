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
        {title:'post one',subtitle:'this is new post one',body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
        {title:'post two',subtitle:'this is new post one',body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
        {title:'post three',subtitle:'this is new post one',body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
    ];

    res.render("index",{title:"Home Page", posts:posts});
});

// // Profile
app.get("/profile",(req,res)=>{
    const user = {
        name:"Aung Kyaw Kyaw",
        age:25,
        city:"Mandalay"
    };
    res.render("profile",{user});
});

// // => Looping
app.get("/students",(req,res)=>{
    const students = [
        {id:1,name:"Aung Aung",age:20,score:85},
        {id:2,name:"Su Su",age:19,score:92},
        {id:3,name:"Nyi Nyi",age:17,score:39}
    ];

    res.render("students", {students});
});

// Must be the LAST route handler
app.use((req, res) => {
    // Ensure you pass 'title' even to the 404 page if it uses the same header/layout structure
    res.status(404).send('<h1>404 Not Found</h1>');
    // OR: res.status(404).render('404', { title: '404 Error' });
});

app.listen(port, () => {
    console.log("Server running on http://localhost:" + port);
});

// <%=  %> = output value
// <%   %> = no output ( Logic Only )
