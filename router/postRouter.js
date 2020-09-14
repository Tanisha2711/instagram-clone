const express = require("express");
const postRouter = new express.Router();
let {createPost,getPost,updatePost,deletePost} = require("../controller/postController");

//POST Routes
postRouter.post("/", createPost);
postRouter.route("/:post_id").get(getPost).patch(updatePost).delete(deletePost);

module.exports=postRouter;