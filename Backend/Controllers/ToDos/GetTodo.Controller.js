import Task from "../../Models/Task.Model.js";
import AsyncHandler from "../../Utils/AsyncHandler.Utils.js";

const GetTodo = AsyncHandler(async (req, res) => {
  const tasks = await Task.find();

  res.status(200).json({ message: "Tasks Retrieved Successfully", tasks });
});

export default GetTodo;
