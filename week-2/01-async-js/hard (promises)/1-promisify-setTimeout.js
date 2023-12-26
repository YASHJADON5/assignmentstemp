/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
    
     return new Promise((resolve,reject)=>{
      
            setTimeout(()=>{
                resolve(`the task has been performed after n seconds ${n/1000}`)
            },n)

        
     })

}
// wait(3000).then((data)=>{
//     console.log(data)
// }).catch((err)=>{
//     console.log(err)

// })

async function main(){
try{
        const data=await wait(3000);
        console.log(data);
}
catch(err){
    console.log(err);
}
}

main();



module.exports = wait;
