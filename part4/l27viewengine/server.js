import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const port = 3000;

app.set("view engine","ejs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    res.render("index");
})


app.listen(port, () => {
    console.log("Server running on http://localhost:" + port);
})