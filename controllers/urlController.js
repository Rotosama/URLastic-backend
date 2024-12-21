const urlManager = require("../models/urlManager");

const getUrlById = async (req, res) => {
	const requestedId = req.params.id;
	try {
		const result = await urlManager.findUrlById(requestedId);
		return res.status(200).json(result);
	} catch (error) {
		console.error(error);
		return res.status(500).send();
	}
};
const getAllUrl = async (req, res) => {
	try {
		const result = await urlManager.getAllUrls();
		return res.status(200).json(result);
	} catch (error) {
		console.error(error);
		return res.status(500).send();
	}
};

const newShortUrl = async (req, res) => {
	const newUrl = req.body.originalUrl;
	const userId = req.user.userId;
	try {
		const result = await urlManager.createUrl(newUrl, userId);
		return res.status(201).json(result);
	} catch (error) {
		console.error(error);
		return res.status(500).send();
	}
};

const deleteUrl = async (req, res) => {
	const requiredUrlId = req.params.id;
	console.log(requiredUrlId);
	try {
		const result = await urlManager.deleteUrl(requiredUrlId);
		return res.status(201).json(result);
	} catch (error) {
		console.error(error);
		return res.status(500).send();
	}
};

const updateUrl = async (req, res) => {
	const customUrl = req.body.customURL;
	const urlId = req.params.id;
	try {
		const result = await urlManager.modifyUrl(urlId, customUrl);
		return res.status(201).json(result);
	} catch (error) {
		console.error(error);
		return res.status(500).send();
	}
};

const redirectUrl = async (req, res) => {
	const shortUrl = req.params.shortUrl;
	try {
		const url = await urlManager.findUrlByShortUrl(shortUrl);
		if (url) {
			return res.redirect(url.originalUrl);
		} else {
			return res.status(404).send("URL not found");
		}
	} catch (error) {
		console.error("Error fetching the original URL:", error);
		return res.status(500).send("Internal Server Error");
	}
};

module.exports = {
	getAllUrl,
	newShortUrl,
	updateUrl,
	deleteUrl,
	getUrlById,
	redirectUrl,
};
