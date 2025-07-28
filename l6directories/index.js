const fs = require("fs");
// => Synchronous
//try{
//    fs.mkdirSync("./newfolderone/folder1/folder2",{recursive:true});
//    console.log("Directores created successfully");
//
//}catch(e){
//    console.log("Error creating directores : ",e);
//}

// => Asynchronous
//fs.mkdir("./newfoldertwo/folder1/folder2",{recursive:true},(err)=>{
//    if(err) return console.log("Error creating directores");
//    console.log("Directores created successfully");
//});

// => Rename Directory ( create first main , data )
// => Synchronous
//try{
//    fs.renameSync("./main","./assets");
//    console.log("Direcotry renamed by sync");
//}catch(e){
//    console.log(e);
//}

// => Asynchronous
//fs.rename("./data","./libs",(err)=>{
//    if(err) throw err;
//    console.log("Direcotry renamed by async");
//})

// => Remove Directory
// => Synchronous
//try{
//    fs.rmSync("./assets",{recursive:true,force:true});
//    console.log("Directory removed successfully with sync");
//}catch(e){
//    console.log(e);
//}

// => Asynchronous
//fs.rm("./libs",{recursive:true,force:true},(err)=>{
//    if(err) throw err;
//    console.log("Directory removed successfully with Async");
//})


// => Check file exists
if(fs.existsSync("index.js")){
    console.log("index file exists");
}else{
    console.log("index file does not exists");
}

// check directory exists
if(fs.existsSync("newfolderone")){
    console.log("newfolderone file exists");
}else{
    console.log("newfolderone file does not exists");
}

// => Read contents of a Directory
//fs.readdir(".",(err,files)=>{
//    if(err) throw err;
//    console.log("Directory contents : ",files);
//
//    files.forEach(file=>{
//        console.log(file);
//    })
//});

// Note {withFileTypes:true}   Direct return Object
fs.readdir(".",{withFileTypes:true},(err,files)=>{
    if(err) throw err;

//    console.log("directory contents : ",files);

    files.forEach(file=>{
        console.log(file);
    })
});


// => File info ( file statistics)
fs.stat("./assets/postone.txt",(err,stats)=>{
    if(err) return console.log("Error stats ",err);

    console.log("Is file : ",stats.isFile());
    console.log("Is file : ",stats.isDir());

});

// fs.mkdirSync(path,{recursive:true});
// fs.mkdir(path,{recursive:true},err);

// {recurisve:true} allowed u to created sub folder under the main folder that u created

// fs.renameSync(path_old,path_new);
// fs.rename(path_old,path_new,callback(err,data))

// fs.rmSync(path,{recursive:true,force:true})
// fs.rm(path,callback);

// fs.existsSync(filename or dirname)

// fs.readdir(path,callback(err,files))