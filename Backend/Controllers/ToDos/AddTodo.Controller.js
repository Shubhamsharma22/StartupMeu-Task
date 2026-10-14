import Task from "../../Models/Task.Model.js"
import AsyncHandler from "../../Utils/AsyncHandler.Utils.js"
import ApiError from "../../Utils/ApiError.Uitls.js"


const AddTodo=AsyncHandler(async(req,res)=>{
    const {title,content,priority,status} = req.body

    if(!title||!content||!priority||!status) throw new ApiError(401,"Task not Valid")

let task={
    title,
    content,
    priority:priority||"low",
    status:status||"pending"
}


if(!task) throw new ApiError(500,"No New Task")

const newtask = await Task.create(task)

res.status(201).json({message:"New Task Created",newtask})


    })

    export default AddTodo

