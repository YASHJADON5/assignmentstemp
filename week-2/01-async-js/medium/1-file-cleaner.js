// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```


const fs= require('fs');


async function readAndWrite(){

    try{
         const text= await new Promise((resolve,reject)=>{
               fs.readFile('file.txt','utf-8',(err,data)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(data);
                }
               })
         })
         const convertedData=text.replace(/\s+/g, ' ');

         fs.writeFile('file.txt',convertedData,'utf-8',(err)=>{
           if(err){
            console.log(err);

           }
           else{
            console.log('writing file has been done');
           }
         })
    }


    catch(err){
        console.log(err);
    }

}

readAndWrite();