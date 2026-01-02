//console.log(process.platform);
//console.log("Node version",process.version);
console.log("version",process.versions);
console.log("Architecture : ",process.arch);
console.log("Current Working location : ",process.cwd());
console.log("Command Line arguments : ",process.argv);
console.log(`process has been running for ${process.uptime()} seconds`);

//node index.js SuSu 25
const argname = process.argv[2];
const argage = process.argv[3];

console.log(argname,argage);

// => Chnage working Directory
console.log("Before ",process.cwd()); // Before  E:\anp\aungnaingphyo\nodejsbatch1\l8process
process.chdir("..")
console.log("After ",process.cwd()); // After  E:\anp\aungnaingphyo\nodejsbatch1

// => Exit the process
//console.log("Before Exists");
//process.exit(0); // 0 => success , 1 = error
//console.log("After Exists");

// exe 1
//function todotask(){
//    if(Math.random() > 0.5){
//        console.log("Task Completed");
//        process.exit(0);
//    }else{
//        console.error("Task Failed");
//        process.exit(1);
//    }
//}
//todotask();
//console.log("Hello Porgram");


//4PS