const mongoose = require("mongoose");

//Connect to MongoDB
function connectDB() {
    mongoose.connect(process.env.HOSTING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", (error) => console.log(error));
    db.once("open", () =>
        console.log("You are connected to URLastic Database")
    );
}

module.exports = connectDB;
