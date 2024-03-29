const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response, next) => {
	const users = await User.find({}).populate(
		"blogs",
		["title", "author", "url"]
	);
	response.json(users);
});

userRouter.post("/", async (request, response, next) => {
	const {username, name, password} = request.body;
	const saltRounds = 10;
	try {
		if (!password) {
			response.status(400).json(
				{error: "Path `password` is required."}
			);
			return;
		}
		if (password.length < 3) {
			return response.status(400).json(
				{error: "Password must be more than 3 characters"}
			);
		}
		const passwordHash = await bcrypt.hash(password, saltRounds);

		const result = await User.create({username, name, passwordHash});
		response.status(201).json(result);
	} catch(exception) {
		next(exception);
	}
});

module.exports = userRouter;
