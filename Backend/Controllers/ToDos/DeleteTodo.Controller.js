import mongoose from "mongoose";
import Task from "../../Models/Task.Model.js";
import AsyncHandler from "../../Utils/AsyncHandler.Utils.js";
import ApiError from "../../Utils/ApiError.Uitls.js";

const DeleteTodo = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Valid Task ID is required");
  }

  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deletedTask) throw new ApiError(404, "Task not found");

  res.status(200).json({ message: "Task Deleted Successfully", deletedTask });
});

export default DeleteTodo;
