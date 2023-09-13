require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = 3000;

module.exports = {
	MONGO_URL,
	PORT
};
