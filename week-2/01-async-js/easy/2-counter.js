// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.





let p=0;

function counter(){
    process.stdout.write(`\r${p}`);
    p++;
    setTimeout(counter,1000);
}

counter();




































































// (Hint: setTimeout)