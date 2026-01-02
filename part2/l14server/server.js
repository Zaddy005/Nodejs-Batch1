const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req,res)=>{
    res.setHeader("Content-Type","text/html");

    // read files async
    fs.readFile('./views/index.ejs','utf-8',(err,data)=>{
        if(err){
            console.error(err);
            res.end();
        }else{
            // method 1
            // res.write(data);
            // res.end()

            // method 2
            res.end(data);
        }
    });
});

const port =5500;
server.listen(port,()=>{
    console.log(`server is running on http://127.0.0.1:${port}`)
})