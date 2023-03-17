const dbClient = require("./connection");
const urlSchema = require("../schemas/urls");
const Shortener = require("link-shortener");

class urlManager {
    static getAllUrls = async () => {
        dbClient();
        const result = await urlSchema.find({});
        return result;
    };

    static findUrlById = async (requestedId) => {
        dbClient();
        const result = urlSchema.findOne({ _id: requestedId });
        if (!result) {
            return null;
        }
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

    static modifyUrl = async (urlId, customUrl) => {
        dbClient();
        const result = await urlSchema.updateOne(
            { _id: urlId },
            { shortenUrl: customUrl }
        );
        console.log(result);
        return result;
    };

    static deleteUrl = async (urlId) => {
        dbClient();
        const result = await urlSchema.deleteOne({ _id: urlId });
        console.log(result);
        return result;
    };
}

module.exports = urlManager;
