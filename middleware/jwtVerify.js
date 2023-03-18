const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];
    
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
                userId: decoded.userId,
            };
        } catch (error) {
            return res.status(401).json({ error: "Invalid token provided" });
        }
    } else {
        return res.status(401).json({ error: "You need a token" });
    }
    next();
};

module.exports = verifyJWT;
