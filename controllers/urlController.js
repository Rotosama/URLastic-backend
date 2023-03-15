const urlManager = require("../models/urlManager");

const getUrl = async (req, res) => {
    let result;
    try {
        if (req.query.orginalUrl){
            result =  await urlManager.findOriginalUrl;
        }   else if (req.query.shortUrl){
            result = await urlManager.findShortUrl;
        }else{
            return res.status(result);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}

const newShortUrl = async (req, res) => {
    const newUrl = req.body.originalUrl;
    const userId = req.user.userId;
    console.log(req.user)
    try {
        const result = await urlManager.createUrl(newUrl, userId)
        return res.status(201).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}

module.exports = {
    getUrl,
    newShortUrl
}