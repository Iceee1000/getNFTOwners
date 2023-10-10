
const fs = require('fs')
      
async function write_data(data, filename){
    fs.writeFile(filename, data.toString(), (err) => {
          
        // In case of a error throw err.
        if (err) throw err;
    })
   }

   async function append_info(data, filename){
    for (let item of data){
        fs.appendFile(filename, item.toString()+"\n", (err) => {
          
            // In case of a error throw err.
            if (err) throw err;
        })
    }
   }

    module.exports={
        write_data,
        append_info
    }