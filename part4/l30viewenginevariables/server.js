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
    res.render("index");
});

// Profile
app.get("/profile",(req,res)=>{
    const user = {
        name:"Aung Kyaw Kyaw",
        age:25,
        city:"Mandalay"
    };
    res.render("profile",{user});
});

// => Looping
app.get("/students",(req,res)=>{
   const students = [
       {id:1,name:"Aung Aung",age:20,score:85},
       {id:2,name:"Su Su",age:19,score:92},
       {id:3,name:"Nyi Nyi",age:17,score:39}
   ];

   res.render("students", {students});
});

app.listen(port, () => {
    console.log("Server running on http://localhost:" + port);
});

// <%=  %> = output value
// <%   %> = no output ( Logic Only )
