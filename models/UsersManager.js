const dbClient = require("./connection");
const userSchema = require("../schemas/user");

class UserManager {
    static findUser = async (email) => {
        dbClient();
        const result = await userSchema.findOne({ email: email });
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

    static updateUser = async () => {
        return result;
    };

    static deleteUser = async () => {
        return result;
    };
}

module.exports = UserManager;
