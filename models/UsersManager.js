const userSchema = require("../schemas/user");
const urlSchema = require("../schemas/urls");

class UsersManager {
    static findUser = async (userId) => {
        const result = await userSchema.findOne({ _id: userId });
        return result;
    };

    static findUserByEmail = async (email) => {
        const result = await userSchema.findOne({ email: email });
        return result;
    };

    static findAllUsers = async () => {
        const result = await userSchema.find({});
        return result;
    };

    static createUser = async (firstName, lastName, email, password) => {
        const result = await userSchema.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });
        return result;
    };

    static deleteUser = async (userId) => {
        const result = await userSchema.deleteOne({ _id: userId });
        return result;
    };

    static findUrlsByUser = async (requestedUserId) => {
        const result = await urlSchema.find({ user: requestedUserId });
        if (!result) {
            return null;
        }
        return result;
    };
}

module.exports = UsersManager;
