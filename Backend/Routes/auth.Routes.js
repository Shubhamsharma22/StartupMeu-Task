import express from "express";
import Login from "../Controllers/Users/Login.Controller.js";
import Register from "../Controllers/Users/Register.Controller.js";

const authRouter = express.Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);

export default authRouter;
