const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController");
const jwtVerify = require("../middleware/jwtVerify");

router.get("/", urlController.getAllUrl);
router.get("/:id", urlController.getUrlById);
router.post("/", jwtVerify, urlController.newShortUrl);
router.patch("/:id", jwtVerify, urlController.updateUrl);
router.delete("/:id", jwtVerify, urlController.deleteUrl);
router.get("/r/:shortUrl", urlController.redirectUrl);

module.exports = router;
