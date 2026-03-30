const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController");
const jwtVerify = require("../middleware/jwtVerify");
const jwtOptional = require("../middleware/jwtOptional");

router.get("/", urlController.getAllUrl);
router.get("/r/:shortUrl", urlController.redirectUrl);
router.get("/:id", urlController.getUrlById);
router.post("/", jwtOptional, urlController.newShortUrl);
router.patch("/:id", jwtVerify, urlController.updateUrl);
router.delete("/:id", jwtVerify, urlController.deleteUrl);

module.exports = router;
