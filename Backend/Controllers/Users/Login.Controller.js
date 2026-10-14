import AsyncHandler from "../../Utils/AsyncHandler.Utils.js"
import ApiError from "../../Utils/ApiError.Uitls.js"
import User from "../../Models/User.Model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config()

const Login = AsyncHandler(async(req,res)=>{

const{email,password} = req.body

if(!email,!password) throw new ApiError(400,"Enter Email and Password")
   const loguser = await User.findOne({email})
 if(!loguser)  throw new ApiError(400,"No User found")

 let isvalid = await bcrypt.compare(password,loguser.password)

if(!isvalid) throw new ApiError(400,"Wrong Password")

const token = jwt.sign({
    id:loguser._id,
    email:loguser.email
},process.env.JWT_Secret)


res.status(201).json({message:"User Logged in Successfully",token})

})

export default Login