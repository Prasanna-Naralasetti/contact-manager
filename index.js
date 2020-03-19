const express=require('express')
const mongoose=require('./config/database')
const app=express()
const port=3040

app.use(express.json())



app.listen(port,()=>{
    console.log('listening to port',port)
})