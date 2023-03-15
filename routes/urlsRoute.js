const express = require("express");
const router = express.Router();
const urlController = require('../controllers/urlController');
const jwtVerify = require("../middleware/jwtVerify");


/* router.get("/", urlController.getAllUrl); */
router.get("/:id", urlController.getUrl);
router.post("/", jwtVerify, urlController.newShortUrl);
/* router.patch("/:id", urlController.updateUrl);
router.delete("/:id", urlController.deleteUrl); */

module.exports = router;