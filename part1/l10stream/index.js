const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const zlib = require("zlib");



// exe1
//const readstream1 = fs.createReadStream("./datafiles/postone.txt");
//
//readstream1.on('data',(chunk)=>{
//    console.log(chunk);
//    console.log(chunk.length);
//    console.log(chunk.toString());
//});
//
//readstream1.on('end',()=>{
//    console.log("Stream exe1 ended");
//});
//
//readstream1.on("error",(err)=>{
//    console.log("Read Error : ",err.message);
//});



// exe2
//const readstream2 = fs.createReadStream("./datafiles/postone.txt");
//readstream2.setEncoding("utf8");
//
//readstream2.on('data',(chunk)=>{
//    console.log(chunk);
//    console.log(chunk.length);
//    console.log(chunk.toString());
//});
//
//readstream2.on('end',()=>{
//    console.log("Stream exe2 ended");
//});
//
//readstream2.on("error",(err)=>{
//    console.log("Read Error : ",err.message);
//});


// exe3
//const readstream3 = fs.createReadStream("./datafiles/postone.txt","utf8");
//
//readstream3.on('data',(chunk)=>{
//    console.log(chunk);
//    console.log(chunk.length);
//    console.log(chunk.toString());
//});
//
//readstream3.on('end',()=>{
//    console.log("Stream exe3 ended");
//});
//
//readstream3.on("error",(err)=>{
//    console.log("Read Error : ",err.message);
//});

//exe4
//const readstream4 = fs.createReadStream("./datafiles/postone.txt",{
//    encoding:"utf-8",
//    highWaterMark:8 // bytes per chunk
//});
//
//readstream4.on('data',(chunk)=>{
//    console.log(chunk);
//    console.log(chunk.length);
//    console.log(chunk.toString());
//});
//
//readstream4.on('end',()=>{
//    console.log("Stream exe3 ended");
//});
//
//readstream4.on("error",(err)=>{
//    console.log("Read Error : ",err.message);
//});

// exe5
//const readstream5 = fs.createReadStream("./datafiles/postone.txt",{encoding:'utf8'});
//let bytes = 0;

//readstream5.on('data',(chunk)=>{
//    bytes += Buffer.byteLength(chunk,'utf8');
//    console.log("Total bytes = ",bytes);
//
//    readstream5.pause();
//    setTimeout(()=>readstream5.resume(),2000);
//});
//
//readstream5.on('end',()=>{
//    console.log("Stream exe5 ended");
//});
//
//readstream5.on("error",(err)=>{
//    console.log("Read Error : ",err.message);
//});


// => piep() to writeable stream ( copy a file )

//exe1
//const rs1 = fs.createReadStream("./datafiles/news.txt");
//const ws1 = fs.createWriteStream("./datafiles/news-one.txt");
//
//rs1.pipe(ws1)
//
//ws1.on('finish',()=>console.log("Copy Finished"));
//rs1.on('error',(err)=>console.log("Read Error",err));
//ws1.on("error",(err)=>console.log("Write error :",err));



//exe2
//const rs2 = fs.createReadStream("./datafiles/news.txt");
//const ws2 = fs.createWriteStream("./datafiles/news-two.txt");
//
//rs2.pipe(ws2);
//
//ws2.on('finish',()=>console.log("Copy Finished"));
//rs2.on('error',(err)=>console.log("Read Error",err));
//ws2.on("error",(err)=>console.log("Write error :",err));

// exe3
//const rs3 = fs.createReadStream("./datafiles/news.txt");
//const ws3 = fs.createWriteStream("./datafiles/news-three.txt");
//
//rs3.on('data',(chunk)=>{
//    ws3.write("\n New Chunk \n");
//    ws3.write(chunk);
//})
//
//ws3.on('finish',()=>console.log("Copy Finished"));
//rs3.on('error',(err)=>console.log("Read Error",err));
//ws3.on("error",(err)=>console.log("Write error :",err));


//exe4

//const server = http.createServer((req,res)=>{
//    const filepath = path.join(__dirname,"datafiles/news.txt");
//    const rs4 = fs.createReadStream(filepath);
//
//    rs4.on("open",()=>{
//       res.writeHead(200,{"Content-Type":"text/plain"});
//       rs4.pipe(res);
//    });
//
//    rs4.on("error",(err)=>{
//        res.writeHead(200,{"Content-Type":"text/plain"});
//        res.end(`Not Found : ${err.message}`);
//    });
//
//}).listen(3000,()=>{
//    console.log("Server is running on http://localhost:3000 ");
//});

// => Stream witth Compression (zlip)
//const zlib = require("zlib");

//exe 5
//const rs5 = fs.createReadStream("./datafiles/news.txt");
//const ws5 = fs.createWriteStream("./datafiles/news.txt.gz");
//
//rs5.pipe(zlib.createGzip()).pipe(ws5);
//
//ws5.on('finish',()=>console.log("File compressed successfully"));
//rs5.on("error",(err)=>console.log("Read error",err));
//ws5.on("error",(err)=>console.log("Write error",err));


// exe6 (unzip)

const rs6 = fs.createReadStream("./datafiles/news.txt.gz");
const ws6 = fs.createWriteStream("./datafiles/newsunzip.txt");

rs6.pipe(zlib.createGunzip()).pipe(ws6);

ws6.on('finish',()=>console.log("File compressed successfully"));
rs6.on("error",(err)=>console.log("Read error",err));
ws6.on("error",(err)=>console.log("Write error",err));