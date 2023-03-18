const UsersManager = require("../models/UsersManager");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const authenticate = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await UsersManager.findUserByEmail(email);
        if (!result) {
            return res
                .status(400)
                .json({ error: "Incorrect email or password" });
        }
        const isCorrectPassword = await argon2.verify(
            result.password,
            password
        );
        if (isCorrectPassword) {
            const token = jwt.sign(
                { userId: result._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.status(200).json({
                token: token,
                userId: result._id,
            });
        } else {
            return res
                .status(400)
                .json({ error: "Incorrect email or password" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Database error occurred" });
    }
};

module.exports = { authenticate };
