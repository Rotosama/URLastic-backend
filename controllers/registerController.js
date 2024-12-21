const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const UsersManager = require("../models/UsersManager");

const register = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	const userAlreadyExist = await UsersManager.findUserByEmail(email);

	if (userAlreadyExist) {
		return res.status(400).json({
			error: "User already exists.",
			message: "useer already exist",
		});
	}

	const hashedPassword = await argon2.hash(password);

	const newUser = await UsersManager.createUser(
		firstName,
		lastName,
		email,
		hashedPassword
	);

	// Generar un token JWT
	const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});

	return res.status(201).json({
		userId: newUser.id,
		token,
		email: newUser.email,
		firstName: newUser.firstName,
		lastName: newUser.lastName,
		message: "User created successfully",
	});
};

module.exports = { register };
