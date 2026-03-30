const urlSchema = require("../schemas/urls");

class urlManager {
	static async findUrlByShortUrl(shortUrl) {
		const result = await urlSchema.findOne({ shortenUrl: shortUrl });
		return result;
	}

	static getAllUrls = async () => {
		const result = await urlSchema.find({});
		return result;
	};

	static findUrlById = async (requestedId) => {
		const result = await urlSchema.findOne({ _id: requestedId });
		if (!result) {
			return null;
		}
		return result;
	};

	static generateShortUrl = () => {
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let shortUrl = "";
		for (let i = 0; i < 8; i++) {
			shortUrl += characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
		}
		return shortUrl;
	};

	static createUrl = async (url, userId) => {
		const shortUrl = await this.generateShortUrl();
		const result = await urlSchema.create({
			originalUrl: url,
			shortenUrl: shortUrl,
			user: userId,
		});
		if (!result) {
			return null;
		}
		return result;
	};

	static modifyUrl = async (urlId, customUrl) => {
		const result = await urlSchema.updateOne(
			{ _id: urlId },
			{ shortenUrl: customUrl }
		);
		return result;
	};

	static deleteUrl = async (urlId) => {
		const result = await urlSchema.deleteOne({ _id: urlId });
		return result;
	};

	static incrementClicks = async (shortUrl) => {
		await urlSchema.updateOne({ shortenUrl: shortUrl }, { $inc: { clicks: 1 } });
	};
}

module.exports = urlManager;
