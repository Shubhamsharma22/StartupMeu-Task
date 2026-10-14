import mongoose from 'mongoose'
import app from './app.js'
const PORT = 3000
let mongo=await mongoose.connect("mongodb://localhost:27017/StartupMeu")

app.listen(PORT,()=>{
    console.log("server is running")
})

