import express from "express";
import AddTodo from "../Controllers/ToDos/AddTodo.Controller.js";
import DeleteTodo from "../Controllers/ToDos/DeleteTodo.Controller.js";
import UpdateTodo from "../Controllers/ToDos/UpdateTodo.Controller.js";
import GetTodo from "../Controllers/ToDos/GetTodo.Controller.js";
import VerifyToken from "../Middleware/VerifyToken.middleware.js";

const taskRouter = express.Router();

taskRouter.get("/", VerifyToken, GetTodo);
taskRouter.post("/", VerifyToken, AddTodo);
taskRouter.patch("/:id", VerifyToken, UpdateTodo);
taskRouter.delete("/:id", VerifyToken, DeleteTodo);

export default taskRouter;
