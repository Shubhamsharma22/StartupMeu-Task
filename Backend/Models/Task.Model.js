import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed", "All"],
    required: true,
  },
});

export default mongoose.model("Task", TaskSchema);
