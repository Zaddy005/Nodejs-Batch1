const fs = require("node:fs");

// => Buffer

// exe 1
const buff1 = Buffer.from("Hello Bago");
console.log("Buffer : ",buff1);
console.log("Buffer to string : ",buff1.toString());
console.log("Buffer : ",buff1.length);
console.log("Buffer to string : ",buff1.toString().length);


// exe 2
const buff2 = Buffer.from("Hello Mawlamyine","utf-8");
console.log("Buffer : ",buff2);
console.log("Buffer : ",buff2.length); // 16
console.log("Buffer to string : ",buff2.toString());
console.log("Buffer to string : ",buff2.toString().length); // 16

// exe 3
const buffa = Buffer.from("Hello ");
const buffb = Buffer.from("Myanmar ");
const buffc = Buffer.from("Country! ");
const joined = Buffer.concat([buffa,buffb,buffc]);
console.log(joined);

// ----------------------------------------------------------
// exe 4 ( Buffer and Stream )
const rs4 = fs.createReadStream("./datafiles/announcement.txt");
let chunks = [];
rs4.on("data",chunk => chunks.push(chunk));
rs4.on('end',()=>{
    const fulltxt = Buffer.concat(chunks).toString();
    console.log(fulltxt);
});
rs4.on("error",err=>console.log("Read Error",err));

// ----------------------------------------------------------

// exe5 compare()
const buff5 = Buffer.from("apple");
const buff6 = Buffer.from("orange");

console.log(buff5,buff6);

const cmp = Buffer.compare(buff5,buff6);
console.log("Compare result : ",cmp);// -1
// equal = 0
// a < b = -1
// a > b = 1
console.log("Is Equal" , buff5.equals(Buffer.from("orange"))); // false
console.log("Is Equal" , buff5.equals(buff6)); // false


// exe 6 : JSON serialization
const buff7 = Buffer.from("Hello Yangon");
const json = JSON.stringify(buff7);
console.log("As json : ",json);  //As json :  {"type":"Buffer","data":[72,101,108,108,111,32,89,97,110,103,111,110]}

const parsed = JSON.parse(json);
console.log(parsed);

const restoredstring = Buffer.from(parsed.data);
console.log(restoredstring);
console.log(restoredstring.toString());


// 8BF







