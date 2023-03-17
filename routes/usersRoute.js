const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const jwtVerify = require("../middleware/jwtVerify");

router.get("/", usersController.getAllUsers);

router.get("/:id/urls", jwtVerify, usersController.getUrlsByUser);
router.get("/:id/", usersController.getUserById);
router.delete("/:id/", usersController.deleteUserById);
/*router.patch("/:id/", jwtVerify, usersController.modifyUser);


 */

module.exports = router;
