const db=require("./connection");
const {v4 : uuidv4}=require('uuid');

const create = function (userobj) {
    userobj.uid=uuidv4();
    return new Promise(function(resolve,reject){
        db.query('INSERT INTO user SET ?',userobj,function(err,result){
            if(err){
                reject(err);
            }else{
                resolve(userobj);
            }
        })

    })

}

const get = function (user_id) {
    return new Promise(function(resolve,reject){
        db.query(`SELECT * from user WHERE uid="${user_id}"`,function(error,result){
            if(error){
                reject(error);
            }else{
                resolve(result[0]);
            }
        })
    })
}

const updateById = function (uid, updateobj) {

}

const deleteById = function (id) {

}

module.exports.create = create;
module.exports.get = get;
module.exports.updateById = updateById;
module.exports.deleteById = deleteById;