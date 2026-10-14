import mongoose from "mongoose";
import Task from "../../Models/Task.Model.js";
import AsyncHandler from "../../Utils/AsyncHandler.Utils.js";
import ApiError from "../../Utils/ApiError.Uitls.js";

const UpdateTodo = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Valid Task ID is required");
  }

  const { title, content, priority, status } = req.body;
  const updates = {};

  if (title !== undefined) updates.title = title;
  if (content !== undefined) updates.content = content;
  if (priority !== undefined) updates.priority = priority;
  if (status !== undefined) updates.status = status;

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, "At least one task field is required to update");
  }

  const updatedTask = await Task.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!updatedTask) throw new ApiError(404, "Task not found");

  res.status(200).json({ message: "Task Updated Successfully", updatedTask });
});

export default UpdateTodo;
