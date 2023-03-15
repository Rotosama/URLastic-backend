const argon2 = require("argon2");
const UsersManager = require("../models/UsersManager");

const register = async (req, res) => {
    const { firstName, lastName, email, password, links } = req.body;
    const userAlreadyExist = await UsersManager.findUser(email);

    if (userAlreadyExist) {
        return res.status(400).json({ error: "User already exists." });
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = UsersManager.createUser(
        firstName,
        lastName,
        email,
        hashedPassword,
        links
    );
    return res.status(201).json({ message: "User created"});
};

module.exports = {register};


