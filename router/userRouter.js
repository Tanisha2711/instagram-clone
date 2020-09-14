const express = require("express");
const userRouter = new express.Router();
let {createUser,getUser,updateUser,deleteUser} = require("../controller/userController");

//USER Routes
userRouter.post("/", createUser);
userRouter.route("/:user_id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports=userRouter;