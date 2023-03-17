const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config("./.env");

const indexRoute = require("./routes/indexRoute");
const loginRoute = require("./routes/loginRoute.js");
const registerRoute = require("./routes/registerRoute.js");
const usersRoute = require("./routes/usersRoute.js");
const urlsRoute = require("./routes/urlsRoute");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/", indexRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/users", usersRoute);
app.use("/urls", urlsRoute);

app.listen(PORT, (error) => {
    if (!error) console.log(`Server up and listening on port: ${PORT}`);
    else console.log("Cannot start server...", error);
});
