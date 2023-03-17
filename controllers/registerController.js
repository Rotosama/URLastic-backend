const argon2 = require("argon2");
const UsersManager = require("../models/UsersManager");

const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const userAlreadyExist = await UsersManager.findUserByEmail(email);

    if (userAlreadyExist) {
        return res.status(400).json({ error: "User already exists." });
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = UsersManager.createUser(
        firstName,
        lastName,
        email,
        hashedPassword
    );
    return res.status(201).json({ message: "User created" });
};

module.exports = { register };
