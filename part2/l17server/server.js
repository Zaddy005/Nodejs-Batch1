const http = require("node:http");
const fs = require("node:fs");
const port =5500;

const server = http.createServer((req,res)=>{
//    console.log(req.url);
//    console.log(req.method);
//    console.log(req.headers);

    res.setHeader("content-Type","text/html","charset=utf-8");

    let url;

    try{
        url = new URL(req.url,`http://${req.header.host}`);
    }catch(err){
        console.error("Error URL :",err);
        res.statusCode = 400;
        res.end("Bad Request");
        return;
    }

    console.log(url);
    console.log(url.pathname);

    let path = "./views/";
    let statusCode = 200;

    if(req.method === "GET" && url.pathname === "/"){
        path += 'index.ejs';
        statusCode = 200;
    }else if(req.method === "GET" && url.pathname === "/about"){
        path += 'about.html';
        statusCode = 200;
    }else if(req.method === "GET" && url.pathname === "/about-us"){
        res.setHeader("Location","/about");
        res.statusCode = 301;
        res.end();
        return; // important
    }else{
        path += '404.html';
        statusCode = 404;
    }


    fs.readFile(path,(err,data)=>{
        if(err){
            console.error(err);
            res.end();
        }else{
            res.statusCode = statusCode;
            res.write(data);
        }
    })

});


server.listen(port,()=>{
    console.log(`server is running on http://127.0.0.1:${port}`)
});

