const mongoose=require('mongoose')
const validator=require('validator')
const bcryptjs=require('bcryptjs')
const Schema=mongoose.Schema
const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    minlength:3,
    validate:{
      validator: function (value) {
        return validator.isAlphanumeric(value)
      },
      message:function(){
        return 'Dont use special characters'
      }
    }
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate:{
      validator:function(value){
        return validator.isEmail(value)
      },
      message:function(){
        return 'invalid email format'
      }
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
    maxlength:128,
  },
  tokens:[{
    token:{
      type: String
    },
    creatAt:{
      type:Date,
      default:Date.now
    }
  }]
});
userSchema.pre('save',function(next){
  const user=this
  if(user.isNew){
    bcryptjs.genSalt(10)
      .then((salt) => {
        bcryptjs.hash(user.password, salt)
          .then((encryptpwd) => {
            user.password = encryptpwd
            next()
          }).catch((err) => {
            console.error(err)
          })
      })
  }else{
    next()
  }
 
})

//own static method
userSchema.statics.findByCredentials=function(email,password){
  const User=this
  return User.findOne({email})
  .then(function(user){
    if(!user){
      return Promise.reject('invalid email')
    }
    return bcryptjs.compare(password,user.password)
    .then(function(result){
      if(result){
        return Promise.resolve(user)
      }else{
        return Promise.reject('invalid password')
      }
    }).catch(function(err){
      return Promise.reject(err)
    })
  })
}
const User = mongoose.model("User", userSchema)
module.exports=User