let userDB = require("../model/user.json");
const fs = require("fs");
const path = require("path");
let userModel = require("../model/userModel");
//Create => POST Method
async function createUser(request, response) {
    try {
        let ndbuser =await userModel.create(request.body);
        //db save
        // console.log(user);
        //if a new entry is created on server
        response.status(201).json({
            sucess: "Successfull",
            user: ndbuser
        })
    }catch(err){
        response.status(500).json({
            success:"faliure",
            "message":err.message
        })
    }

};

// Read => GET Method
async function getUser(request, response) {
    let { user_id } = request.params;
    try{
        let user;
        user=await userModel.get(user_id);
    
        if (user == undefined) {
            return response.status(404).json({
                status: "faliure",
                message: "user not found"
            })
        }
    
        response.status(200).json({
            status: "success",
            user: user
        })
        
    }catch(err){
        response.status(500).json({
            message: err.message,
            status: "faliure"
        })
    }
};

//Update => PATCH Method
function updateUser(request, response) {
    let { user_id } = request.params;
    let user;
    let toUpdate = request.body;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].userID == user_id) {
            user = userDB[i];
        }
    }

    for (let key in toUpdate) {
        user[key] = toUpdate[key];
    }

    if (user == undefined) {
        return response.status(404).json({
            status: "faliure",
            message: "user not found"
        })
    }

    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));

    response.status(200).json({
        status: "success",
        "message": "message"
    })
};

//Delete => DELETE Method
function deleteUser(request, response) {
    let { user_id } = request.params;
    let initialUserLen = userDB.length;
    userDB = userDB.filter(function (user) {
        return user.userID != user_id;
    })

    if (initialUserLen == userDB.length) {
        return response.status(400).json({
            status: "faliure",
            message: "user not found"
        })
    }

    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));

    response.status(200).json({
        status: "success",
        "message": "user deleted"
    })


};

module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
