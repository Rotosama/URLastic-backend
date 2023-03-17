const dbClient = require("./connection");
const userSchema = require("../schemas/user");
const urlSchema = require("../schemas/urls");

class UsersManager {
    static findUser = async (userId) => {
        dbClient();
        const result = await userSchema.findOne({ _id: userId });
        return result;
    };

    static findUserByEmail = async (email) => {
        dbClient();
        const result = await userSchema.findOne({ email: email });
        return result;
    };

    static findAllUsers = async () => {
        dbClient();
        const result = await userSchema.find({});
        return result;
    };

    static createUser = async (firstName, lastName, email, password) => {
        dbClient();
        const result = await userSchema.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });
        return result;
    };
    //No esta en el controller
    /*   static updateUser = async (userId, password) => {
        dbClient();
        const result = await userSchema.updateOne({ _id: userId});
        return result;
    }; */

    static deleteUser = async (userId) => {
        dbClient();
        const result = await userSchema.deleteOne({ _id: userId });
        return result;
    };

    static findUrlsByUser = async (requestedUserId) => {
        dbClient();
        const result = await urlSchema.find({ user: requestedUserId });
        if (!result) {
            return null;
        }
        return result;
    };
}

module.exports = UsersManager;
