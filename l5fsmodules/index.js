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


// => Check File exists

//=> Synchronous
try{
    fs.accessSync("./assets/postone.txt");
    console.log("File exists");
}catch(err){
    console.log("File does not exist");
}

//=> Asynchronous
fs.access("./assets/postone.txt",fs.constants.F_OK,(err)=>{
    if(err) return console.log(err);
    console.log("File is Existed");
});

// => File info ( file statistics)
fs.stat("./assets/postone.txt",(err,stats)=>{
    if(err) return console.log("Error stats ",err);

    console.log(stats);

    console.log("File Stats",{
        filesize:stats.size,
        createdAt:stats.birthtime,
        updatedAt:stats.mtime,
        isfile:stats.isFile(),
        isdirectory:stats.isDirectory()
    });
});

// => Write FIle
// => Synchronous
const content = "This is new article.";
try{
    fs.writeFileSync("./datafiles/articles.txt",content);
    console.log("Successfully written");
}catch(err){
    console.log(err);
}

//=> Asynchronous
fs.writeFile("./datafiles/articletwo.txt",content,()=>{
    console.log("Successfully written");
});

// => Append File
const newcontent = "\nAppended content text";

//=> Synchronous
try{
    fs.appendFileSync("./datafiles/articles.txt",newcontent);
    console.log("Content appended successfully");
}catch(err){
    console.error(err);
}

//=> Asynchronous
fs.appendFile("./datafiles/articletwo.txt",newcontent,(err)=>{
    if(err) return console.log(err);
    console.log("content appended Successfully");
});


// => Rename File
// => Synchronous
try{
    fs.renameSync("./datafiles/articles.txt","./datafiles/articleOne.txt");
    console.log("Content renamed successfully");
}catch(err){
    console.error(err);
}

// => Asynchronous
fs.rename("./datafiles/articletwo.txt","./datafiles/articleTwo.txt",(err)=>{
    if(err) return console.log(err);
    console.log("Content renamed successfully");
});

// => Delete Files
// => Synchronous
try{
    if(fs.existsSync("./datafiles/articleOne.txt")){
        fs.unlinkSync("./datafiles/articleOne.txt");
        console.log("Content deleted successfully");
    }
}catch(err){
    console.error(err);
}

// => Asynchronous
fs.unlink("./datafiles/articletwo.txt",(err)=>{
    if(err){
        if(err.code === "ENOENT"){
            console.log("Files does not exists async");
        }else{
            console.error("Error deleteing file : ",err);
        }
    }
    console.log("Content deleted successfully by async");
});


// => Read
// fs.readFileSync(path,encoding)
// fs.readFile(path,encoding,callback(err,data)=>{})

// fs.accessSync(path,keyword);
// fs.access(path,keyword,callback);
// Note: fs.constants.F_OK = Cross-platform consistency. way to check existence across different operating system

// => Write
// fs.writeFileSync(path,content);
// fs.writeFile(path,content,callback);

// => Append
// fs.appendFileSync(path,content)
// fs.appendFile(path,content,callback)

// => rename file
// fs.renameSync(path/oldname,path/newname)
// fs.rename(path/oldname,path/newname,callback)

// => delete file
// fs.unlinkSync(path);
// fs.unlink(path,callback);

// 14FR
// 21UL