const readline = require("readline");

// => exe1 ( single question )
//const rl = readline.createInterface({
//    input:process.stdin,
//    output:process.stdout
//});
//
//rl.question("What is your name ? ",(name)=>{
//    console.log(`Hello ${name}`);
//    rl.close();
//})

// exe 2 ( multi questions )
//const rl = readline.createInterface({
//    input:process.stdin,
//    output:process.stdout
//});
//rl.question(("Name: "),(name)=>{
//    rl.question("Age : ",(age)=>{
//        console.log(`Name : ${name}, Age : ${age}`);
//        rl.close();
//    })
//});

// exe 3 ( multi questions with sync await )
//function questionAsync(rl,prompt){
//    return new Promise(resolve => rl.question(prompt,resolve));
//}
//
//async function main(){
//    const rl = readline.createInterface({
//        input:process.stdin,
//        output:process.stdout
//    });
//
//    const name = await questionAsync(rl,"Name: ");
//    const city = await questionAsync(rl,"City: ");
//
//    console.log(`Hello ${name} from ${city}!`);
//    rl.close();
//}

//main();


// => exe4 loop
//function questionAsync(rl,prompt){
//    return new Promise(resolve => rl.question(prompt,resolve));
//}
//
//async function main(){
//    const rl = readline.createInterface({
//        input:process.stdin,
//        output:process.stdout
//    });
//
//    let num;
//
//    while(true){
//        const answer = await questionAsync(rl,"Enter a number (1 to 10) : ");
//
//        num = Number(answer);
//
//        if(!Number.isNaN(num) && num >= 1 && num <= 10 ) break;
//
//        console.log("Invalid : try again!");
//    }
//
//    console.log(`You chose :  ${num}`);
//    rl.close();
//}
//
//main();

// exe5 rl.prompt() with "line" event and "closee" event

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const todos = [];

//rl.prompt();
//console.log("Commands : help , add [your task], list , exit");
//rl.prompt();

//rl.on('line',(line)=>{
//    const input = line.trim();
//});

//15RL