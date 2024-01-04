const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response, next) => {
	const users = await User.find({})
	response.json(users);
});

userRouter.post("/", async (request, response, next) => {
	const { username, name, password } = request.body;
	const saltRounds = 10;
	if (password.length < 3) {
		return response.status(400).json(
			{ error: "Password must be more than 3 characters" }
		);
	}
	const passwordHash = await bcrypt.hash(password, saltRounds);
	
	const user = new User({ username, name, passwordHash });

	try {
		const result = await user.save()
		response.status(201).json(result);
	} catch(exception) {
		next(exception);
	}
});

module.exports = userRouter;
