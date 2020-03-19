const mongoose=require('mongoose')
mongoose.Promise=global.Promise
    mongoose.connect('mongodb://localhost:27017/contact-manager',{useNewUrlParser:true})
     .then(()=>{
         console.log('connected to db')
     }).catch((err)=>{
         console.log(err+'error')
     })

module.exports={
    mongoose
}
