
const User=require('../models/register')

module.exports.register=(req,res)=>{
    const body=req.body
    const user=new User(body)
    user.save()
    .then((user)=>{
        res.send(user)
    }).catch((err)=>{
        if(err&&err.message){
        res.status(400).send({ error: err.message })
        }else{
        res.status(404).send('not found')
        }
    })
}

module.exports.login=(req,res)=>{
    const body=req.body
    User.findByCredentials(body.email,body.password)
    .then(function(user){
        res.send(user)
    }).catch((err)=>{
        res.send(err)
    })

    }
