const path = require("path");
//path.basename();
// => Get director
// y name from a file path , dirname();
const filepath = "E:/anp/aungnaingphyo/nodejsbatch1/l7pathmodules";
const dirname = path.dirname(filepath);
//console.log("Directory : ",dirname); // E:/anp/aungnaingphyo/nodejsbatch1/
//console.log("Filename : ",path.basename(filepath));  // l7pathmodules


//console.log("Directory : ",path.dirname(__dirname)); // E:/anp/aungnaingphyo/nodejsbatch1/
//
//console.log("Filename : ",path.basename(__dirname));  // l7pathmodules
//console.log("Filename without extension : ",path.basename(filepath,".js"));  // l7pathmodules
//

console.log("File extension : ",path.extname(__filename)); // .js

//path.dirname(absolute file path);
//path.basename(absolute file path);


// 28FE