const Users = require("../models/usersModel");

const deleteAllUsers = async () => {
    try {
        await Users.deleteMany({});
        console.log("ALL USERS DELETED !!!");
    } catch (err) {
        console.log(err);
        console.log("SOMETHING WENT WRONG WHILE DELETING USERS !!");
    }
};
module.exports = deleteAllUsers;
