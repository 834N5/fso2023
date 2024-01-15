require("dotenv").config();

const MONGO_URL = process.env.NODE_ENV === "test"
	? process.env.TEST_MONGO_URL
	: process.env.MONGO_URL;
const PORT = 3000;
const SECRET = process.env.SECRET;

module.exports = {
	MONGO_URL,
	PORT,
	SECRET
};
