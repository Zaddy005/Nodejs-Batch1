// => Without Streaming

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const filepath = path.join(__dirname,"paragraph.txt");
const PORT = 3001;
const server = http.createServer((req,res)=>{
    if(req.url === "/file"){
//        try{
//            const data = fs.readFileSync(filepath,'utf8');
//
//            res.writeHead(200,{
//                'Content-Type':'text/plain;charset=utf-8',
//                'Content-Length':Buffer.byteLength(data)
//            });
//
//            res.end(data);
//        }catch(err){
//            res.writeHead(404).end('File not found!');
//        }

    fs.stat(filepath,(err,stats)=>{
        if(err) return res.writeHead(404).end("File not found");

        res.writeHead(200,{
            'Content-Type':'text/plain;charset=utf-8',
            'Content-Length':stats.size
        });

        const stream = fs.createReadStream(filepath);
        stream.pipe(res);
    });

    }else{
        res.writeHead(200).end('Go to : http://localhost:3000/file');
    }
});

server.listen(PORT,'localhost',()=>{
    console.log(`Server is running http://127.0.0.1:${PORT}`)
});

//29WH