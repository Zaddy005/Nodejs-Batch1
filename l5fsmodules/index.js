const fs = require("fs");

// Synchronous File Read
try{
    const postone = fs.readFileSync("./assets/postone.txt","utf8");
    console.log("This is Synchronous Method : " , postone);
}catch(err){
    console.log(err);
}
console.log("This is Final call 1")

// Asynchronous File Read
fs.readFile("./assets/postone.txt",(err, data)=>{
    if(err) return console.log(err);
    console.log("This is Asynchronous Method : ", data.toString());
})
console.log("This is Final call 2");

fs.readFile("./assets/postone.txt","utf8",(err, data)=>{
    if(err) return console.log(err);
    console.log("This is Asynchronous Method : ", data);
})
console.log("This is Final call 3");


// readFileSync(path,encoding)
// readFile(path,encoding,callback(err,data)=>{})


// 14FR