const dbClient = require("./connection");
const urlSchema = require("../schemas/urls");
const Shortener = require("link-shortener");

class urlManager {
    static findOriginalUrl = async (url) => {
        dbClient();
        const result = await urlSchema.findOne({ originalUrl: url });
        return result;
    };

    static findShortUrl = async (url) => {
        dbClient();
        const result = await urlSchema.findOne({ shortenUrl: url });
        return result;
    };

    static findUrlsByUser = async (requestedUserId) => {
        dbClient();
        const result = await urlSchema.findOne({ $where: requestedUserId });
        return result;
    };

    static createUrl = async (url, userId) => {
        dbClient();
        const shortUrl = await Shortener.Shorten(url);
        const result = await urlSchema.create({
            originalUrl: url,
            shortenUrl: shortUrl,                                         
            user: userId,
        });
        if (!result) {
            return null;
        }
        console.log(result);
        return result;
    };

    static modifyUrl = async (urlId, modifiedUrl) => {
        dbClient();

        const result = await urlSchema.findByIdAndUpdate(urlId, {
            shortenUrl: modifiedUrl,
        });

    };
}

module.exports = urlManager;
