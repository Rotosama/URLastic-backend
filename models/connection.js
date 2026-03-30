const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect(process.env.HOSTING);
    const db = mongoose.connection;
    db.on("error", (error) => console.log(error));
    db.once("open", () => console.log("Connected to URLastic Database"));
}

module.exports = connectDB;
