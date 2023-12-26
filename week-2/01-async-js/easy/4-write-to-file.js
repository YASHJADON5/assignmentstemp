// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs= require('fs');

const text='how are you all doing,hey there'


            
fs.writeFile('a.txt',text,'utf8',(err,data)=>{
   if(err){
      console.log(err);
   }
   else{
    console.log('done');
   }
}
)
            
        