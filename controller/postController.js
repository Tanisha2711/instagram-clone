let postDB= require("../model/post.json");
const fs = require("fs");
const path = require("path");

// Create => POST MEthod
function createPost(request, response) {
    let post = request.body;
    //db save
    postDB.push(post);
    fs.writeFileSync(path.join(__dirname, "post.json"), JSON.stringify(postDB));
    // console.log(post);
    //if a new entry is created on server
    response.status(201).json({
        sucess: "Successfull",
        post: post
    })
};

// Read => GET Method
function getPost(request, response) {
    let { post_id } = request.params;
    let post;
    for (let i = 0; i < postDB.length; i++) {
        if (postDB[i].postID == post_id) {
            post = postDB[i];
        }
    }

    if (post == undefined) {
        return response.status(404).json({
            status: "faliure",
            message: "post not found"
        })
    }

    response.status(200).json({
        status: "success",
        post: post
    })
};

//Update => PATCH Method
function updatePost(request, response) {
    let { post_id } = request.params;
    let post;
    let toUpdate = request.body;
    for (let i = 0; i < postDB.length; i++) {
        if (postDB[i].postID == post_id) {
            post = postDB[i];
        }
    }

    for (let key in toUpdate) {
        post[key] = toUpdate[key];
    }

    if (post == undefined) {
        return response.status(404).json({
            status: "faliure",
            message: "post not found"
        })
    }

    fs.writeFileSync(path.join(__dirname, "post.json"), JSON.stringify(postDB));

    response.status(200).json({
        status: "success",
        "message": "message"
    })
};


//Delete => DELETE Method
function deletePost(request, response) {
    let { post_id } = request.params;
    let initialPostLen = postDB.length;
    postDB = postDB.filter(function (post) {
        return post.postID != post_id;
    })

    if (initialPostLen == postDB.length) {
        return response.status(400).json({
            status: "faliure",
            message: "post not found"
        })
    }

    fs.writeFileSync(path.join(__dirname, "post.json"), JSON.stringify(postDB));

    response.status(200).json({
        status: "success",
        "message": "post deleted"
    })


};


module.exports.createPost=createPost;
module.exports.getPost=getPost;
module.exports.updatePost=updatePost;
module.exports.deletePost=deletePost;
