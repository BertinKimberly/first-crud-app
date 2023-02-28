const mongoose = require('mongoose')

mongoose.set('strictQuery',true);

const URI="mongodb://127.0.0.1:27017/";
const connection = ()=>{
    try {
    mongoose.connect(URI,
        {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    }
   
    ).then(()=>{
        console.log('successfully connected..')
    }).catch((err)=>{
        console.log(err);
    })
   }
   catch(error){
    console.log('failed to connect',error)
   }
}

module.exports =connection;

