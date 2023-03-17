const usersManager = require("../models/UsersManager");

const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await usersManager.findUser(userId);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};
const getUrlsByUser = async (req, res) => {
    const userId = req.user.userId;
    try {
        const result = await usersManager.findUrlsByUser(userId);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};

const getAllUsers = async (req, res) => {
    try {
        const result = await usersManager.findAllUsers();
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};

const deleteUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await usersManager.deleteUser(userId);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};

module.exports = { getUserById, getUrlsByUser, getAllUsers, deleteUserById };
