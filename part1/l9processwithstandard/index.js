//=> Process with Standard Input / Output / Error

//process.stdin( standard input )
//process.stdout( standard output )
//process.stderr( standard error )

process.stdout.write("Hello \n");
process.stdout.write("Yangon");
process.stdout.write("\n");

// =. Get Terminal Size
console.log("Terminal width : ",process.stdout.columns);
console.log("Terminal height : ",process.stdout.rows);


// => clearLine(0) , cursorTo(0)
// exe 1 ( progress bar )
//let progress = 0;
//const progressinter = setInterval(()=>{
//    process.stdout.clearLine(0);
//    process.stdout.cursorTo(0);
//    process.stdout.write(`Porgress : ${progress}% \n`);
//    progress += 10;
//    if(progress > 100){
//        clearInterval(progressinter);
//        process.stdout.write(`\n`);
//    }
//},300);
//console.log("I am printing...");

// => process.stdin ( asynchronous )

console.log("Type your name and press Enter");

// on vs once
//once() it better for we only expect one input
//on () for more input
// exe1
//process.stdin.setEncoding("utf8");
//process.stdin.once("data",(data)=>{
//    const getname = data.toString().trim();
//    console.log(`Your name is ${getname}`);
//    process.exit(0);
//});
//console.log("I am working...");

//process.stdin.on("data",(data)=>{
//    const getname = data.toString().trim();
//    console.log(`Your name is ${getname}`);
//    process.exit(0);
//});
//console.log("I am working...");


// exe2

//console.log("Do you like iPhone ? (yes/no)");
//process.stdin.setEncoding("utf8");
//process.stdin.once("data",(data)=>{
//    let getanswer = data.toString().trim().toLowerCase();
//    if(getanswer === "yes"){
//        console.log("Awesome");
//    }else{
//        console.log("Maybe you'll like it later.");
//    }
//    process.exit()
//});


// => process.stderr
//process.stderr.write("Error , Something went wrong \n");
process.stderr.write("Error , Cannot connect to database \n");
process.exit(1);
console.log("i am doing");

//11ST