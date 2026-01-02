const http = require("node:http");
const fs = require("node:fs");
const port =5500;


const server = http.createServer((req,res)=>{
//    res.setHeader("Content-Type","text/html");
//    res.setHeader("Content-Type","text/html","charset=utf-8");

    res.writeHead(200,{"Content-Type":"text/html"});

    let path = "./views/";

    console.log(req.url);

    switch (req.url){
        case '/':
            path += "index.ejs";
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us': // redirect
            res.setHeader('Location','/about');
            res.statusCode = 301;
            res.end();
        default :
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path,(err,data)=>{
        if(err){
            console.error(err);
            res.end();
        }else{
            res.write(data);
            res.end();
        }
    });

});

server.listen(port,()=>{
    console.log(`server is running on http://127.0.0.1:${port}`)
});

//22SV