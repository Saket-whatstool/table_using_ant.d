const express = require("express");
const {createUser, getUsers, getUser, updateUser, deleteUser} = require("../Controller/User.Controller")

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);


module.exports = {userRouter}