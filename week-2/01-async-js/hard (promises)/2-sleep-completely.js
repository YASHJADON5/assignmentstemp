/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */


function sleep (seconds) {
      
      return new Promise((resolve,reject)=>{
          setTimeout(resolve,seconds)
      })
      
  }
  
  sleep(5000).then(()=>{
      console.log('task done after 5 seconds')
  }).catch((err)=>{
      console.log(err);
  })
  


module.exports = sleep;
