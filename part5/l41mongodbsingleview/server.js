import express from "express";
import {fileURLToPath} from "url";
import path from "path";
import morgan from "morgan";
import mongodb, {MongoClient, ObjectId} from "mongodb";

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
    req.db = db;
    next();
})

// GET route
app.get("/",async (req, res) => {
    try{
        let posts = await db.collection("posts")
                    .find({})
                    .sort({ createdAt: -1 })
                    .toArray();

        console.log(posts);

        res.render("index", {
            title:"Home Page",
            posts: posts,
            postCount: posts.length,
        });
    }catch(e){
        console.error("Error Fetching Posts From MongoDB ",e);
        res.status(500).render("error",{
            title:"Databasee Error",
            message:"Failed to laod posts from mongodb"
        })
    }
});


// single post view
app.get("/post/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        if(!ObjectId.isValid(id)){
            return res.status(400).render("error",{
                title:"Invalid Id",
                error:"Post id is not valid"
            });
        };

        const post = await req.db.collection('posts').findOne({_id:new ObjectId(id)});

        if(!post){
            console.error("Post not found!");
            return res.status(404).render("error",{
                title:"Post not found",
                error:"Post not Found"
            });
        }

        res.render("singleView",{
            title:"Single Post View",
            post:post
        })

    }catch(e){
        console.error(e);
        res.status(500).render("error",{
            title:"Serveree Error",
            error:`Failed to load edit page ${e.message}`
        });
    }
});

// Edit Start
app.get("/posts/:id/edit",async (req, res) => {
    try{
        const { id } = req.params;
        if(!ObjectId.isValid(id)){
            return res.render("error",{
               title:"Invalid Id",
               error:"Post id is not valid"
            });
        }

        let post = await req.db.collection("posts").findOne({_id:new ObjectId(id)});
        console.log(req.db);

        if(!post){
            return res.status(404).render("error",{
                title:"Post not found",
                error:"Post not Found"
            });
        }

        res.status(200).render("edit",{
            title:"Edit Post",
            error:null,
            FormData:post
        });

    }catch(e){
        console.error("Error Fetchin Post from MongoDB",e);
        res.status(500).render("error",{
            title:"Serveree Error",
            error:`Failed to load edit page ${e.message}`
        });
    }
});


app.post("/posts/:id/edit",async(req,res)=>{
    try{

        const {id} = req.params;
        const {title,subtitle,body} = req.body;

        // validation
        if(!ObjectId.isValid(id)){
            return res.status(404).render("error",{
                title:"Invalid Id for edit post",
                error:"Post id is not valid"
            });
        }

        // Validation
        if(!title || !subtitle || !body){
            // reload old post to refile
            const post = await req.db.collection("posts").findOne({_id:new ObjectId(id)});
            return res.status(200).render("edit",{
                title:"Edit Post",
                error:"All Fields are required",
                FormData:{
                    ...post,
                    title,
                    subtitle,
                    body
                }
            });
        }

        const updateData = {
            title:title.trim(),
            subtitle:subtitle.trim(),
            body:body.trim()
        };

        const result = await req.db.collection("posts").updateOne(
            {_id:new ObjectId(id)},
            {$set:updateData}
        );

        if(result.matchedCount === 0){
            res.status(404).render("404");
        }

        res.redirect("/");
    }catch(e){
        console.error("Error Creating Post",e);
        res.render("error",{
            title:"Failed Creating Post",
            error:"Failed to creating Post"
        })
    }
});

// Edit End

// Start Delete
app.post("/post/:id/delete",async(req,res)=>{
    try{
        const {id} = req.params;
        const result = await req.db.collection("posts").deleteOne({_id:new ObjectId(id)});

        if(result.deletedCount !== 1){
            return res.render("error",{
                title:"Server Error",
                message:"Failed to delete post"
            });
        }

        res.redirect("/")
    }catch(e){
        console.error(e);
        res.status(500).render("error",{
            title:"Serveree Error",
            error:`Failed to delete post ${e.message}`
        })
    }
});
// End Delete


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