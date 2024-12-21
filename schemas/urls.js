const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema(
	{
		originalUrl: {
			type: String,
			trim: true,
			required: true,
		},
		shortenUrl: {
			type: String,
			trim: true,
		},
		user: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("url", urlSchema);
