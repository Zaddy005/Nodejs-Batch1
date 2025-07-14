// => Useful Os Methods

const os = require("os");

// User & Host Info
console.log("Home Directory :",os.homedir()); // c:\Users\MSI
console.log("Current  User info : ",os.userInfo()); // info:obj
console.log("Current  User info : ",os.userInfo().username); // MSI
console.log("Current  User info : ",os.userInfo().homedir); // c:\Users\MSI
console.log("The System hostname : ",os.hostname()); // administrator


// System Info
console.log("Os platform : ",os.platform());
console.log("OS Type : ",os.type());
console.log("CPU architecture : ",os.arch());

// CPU and Memory Info
console.log("An array of CPU cores : ",os.cpus());
console.log("An array of CPU cores info : ",os.cpus()[0].model);
console.log("Total system memory in bytes : ",os.totalmem());
console.log("free system memory in bytes : ",os.freemem());

// Network Info
// console.log("Network Interfaces : ",os.networkInterfaces());
console.log("Network Interfaces : ",os.networkInterfaces().Ethernet[0].address);

// System Uptime
console.log("System upteim in seconds : ",os.uptime());