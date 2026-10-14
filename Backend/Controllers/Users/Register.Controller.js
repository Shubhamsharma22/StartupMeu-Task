import AsyncHandler from "../../Utils/AsyncHandler.Utils.js"
import ApiError from "../../Utils/ApiError.Uitls.js"
import User from "../../Models/User.Model.js"
import bcrypt from "bcrypt"

const Register = AsyncHandler(async(req,res)=>{
   const {name,email,password} = req.body
    
   if(!name || !email || !password) throw new ApiError(401,"Enter All Fields")
   if(password.length > 6) throw new ApiError(400,"Password must be 6 characters or fewer")
 
   const hashpassword = await bcrypt.hash(password,10)

   const NewUser = {
    name,
    email,
    password:hashpassword
   }

  await User.create(NewUser)

res.status(201).json({message:"User created Successfully",NewUser})

})

export default Register
