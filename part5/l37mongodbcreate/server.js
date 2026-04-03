import express from "express";
import {fileURLToPath} from "url";
import path from "path";
import morgan from "morgan";
import mongodb, {MongoClient} from "mongodb";

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
app.use(express.urlencoded({extended: true})); // ***** HTML from submit for post/put
app.use(express.json());// for JOSN requests

// mongoDB Atlas URI
const cluster = "cluster0";
const dbName = "nodejsbatch2";
const dbUser = "zaddy";
const dbPassword = "dZPLu8yZwGpULzB4";
const dbURL = `mongodb+srv://${dbUser}:${dbPassword}@${cluster}.lzogzuk.mongodb.net/?appName=Cluster0`;


// MongoDB Client
let client, db;

// Connect to mongoDB
async function connect() {
    try {
        client = new MongoClient(dbURL);
        await client.connect();

        db = client.db(dbName);
        console.log("Connected to mongodb");
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

connect().catch((err) => {
    console.error(err);
})

app.use((req, res, next) => {
    if (!db) {
        return res.status(503).send("Database is not connected!. Please try again!");
    }
    next();
})

// GET route
app.get("/", (req, res) => {
    // res.render("index");
    // res.render("index",{title:"Home Page"});

    const posts = [{
        title: "post one",
        subtitle: "this is new post one",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    }, {
        title: "post two",
        subtitle: "this is new post two",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    }, {
        title: "post three",
        subtitle: "this is new post three",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },];

    res.render("index", {posts: posts, title: "Home Page"});

});

app.get("/about", (req, res) => {
    res.render("about", {title: "About"});
});

app.get("/about-us", (req, res) => {
    res.redirect("/about", {title: "About"});
});

app.post("/createuser", (req, res) => {
    console.log(req.body);
});

app.get("/posts/create", (req, res) => {
    res.render("create", {
        title: "Create Page", error: null, FormData: null
    });
});

app.post("/posts/create", async (req, res) => {
    try {
        const {title, subtitle, body} = req.body;

        // validation
        if ((!title || !subtitle || !body) || (title.trim().length < 0 || subtitle.trim().length < 0 || body.trim().length < 0) ) {
            return res.render("create", {
                title: "Create Page",
                error: "all field required",
                FormData: req.body
            });
        }

        // prepare post data
        const newPost = {
            title: title.trim(),
            subtitle: subtitle.trim(),
            body: body.trim(),
            createdAt:new Date()
        };

        // save
        const result = await db.collection("posts").insertOne(newPost);
        console.log("Post created with ID : ", result.insertedId);

        // success message
        res.render("success", {
            title: "Success",
            message: `Post Created Successfully`,
            postId:result.insertedId
        });
    } catch (e) {
        res.render("create", {
            title: "Create New Post",
            error: `Failed to create post : ${e.message}`,
            FormData: req.body
        })
    }
});

// 404 ( note : that must be bottom line )
app.use((req, res, next) => {
    res.status(404).render("404", {title: "404"});
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